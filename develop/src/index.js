const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const connectToDatabase = require('../db/db');

const Employee = require('../lib/employee');
const Role = require('../lib/role');
const Department = require('../lib/department');

async function startApp() {
  try {
    const db = await connectToDatabase();
    const employee = new Employee(db);
    const role = new Role(db);
    const department = new Department(db);

    // Fetch role data, manager data, and department data
    const roles = await role.getAllRoles();
    const employees = await employee.getAllEmployees();
    const departments = await department.getAllDepartments();

    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'Add an employee',
        'View all roles',
        'Add a role',
        'View all departments',
        'Add a department',
        'Exit',
      ],
    });

    switch (action) {
      case 'View all employees':
        const allEmployees = await employee.getAllEmployees();
        console.table(allEmployees);
        break;

      case 'Add an employee':
        const employeeData = await inquirer.prompt([
          {
            type: 'input',
            name: 'first_name',
            message: "Enter the employee's first name:",
          },
          {
            type: 'input',
            name: 'last_name',
            message: "Enter the employee's last name:",
          },
          {
            type: 'list',
            name: 'role_id',
            message: "Select the employee's role:",
            choices: roles.map((role) => ({ name: role.title, value: role.id })),
          },
          {
            type: 'list',
            name: 'manager_id',
            message: "Select the employee's manager:",
            choices: employees.map((employee) => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
          },
        ]);
        await employee.addEmployee(
          employeeData.first_name,
          employeeData.last_name,
          employeeData.role_id,
          employeeData.manager_id
        );
        console.log('Employee added successfully.');
        break;

      case 'View all roles':
        const allRoles = await role.getAllRoles();
        console.table(allRoles);
        break;

      case 'Add a role':
        const roleData = await inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the role title:',
          },
          {
            type: 'input',
            name: 'salary',
            message: 'Enter the role salary:',
          },
          {
            type: 'list',
            name: 'department_id',
            message: 'Select the department for this role:',
            choices: departments.map((department) => ({ name: department.name, value: department.id })),
          },
        ]);
        await role.addRole(roleData.title, roleData.salary, roleData.department_id);
        console.log('Role added successfully.');
        break;

      case 'View all departments':
        const allDepartments = await department.getAllDepartments();
        console.table(allDepartments);
        break;

      case 'Add a department':
        const departmentData = await inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Enter the department name:',
          },
        ]);
        await department.addDepartment(departmentData.name);
        console.log('Department added successfully.');
        break;

      case 'Exit':
        console.log('Goodbye!');
        return;
    }

    startApp();
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

startApp();
