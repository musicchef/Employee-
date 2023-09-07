const mysql = require('mysql2/promise');

class Employee {
  constructor(connection) {
    this.connection = connection;
  }

  async getAllEmployees() {
    try {
      const [rows] = await this.connection.query('SELECT * FROM employee');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async addEmployee(firstName, lastName, roleId, managerId) {
    try {
      await this.connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
      console.log(`Employee "${firstName} ${lastName}" added successfully.`);
    } catch (error) {
      throw error;
    }
  }

  async updateEmployeeRole(employeeId, newRoleId) {
    try {
      await this.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
      console.log(`Employee with ID ${employeeId} has been updated to a new role.`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Employee;
