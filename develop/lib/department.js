const mysql = require('mysql2/promise');

class Department {
  constructor(connection) {
    this.connection = connection;
  }

  async getAllDepartments() {
    try {
      const [rows] = await this.connection.query('SELECT * FROM department');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async addDepartment(name) {
    try {
      await this.connection.query('INSERT INTO department (name) VALUES (?)', [name]);
      console.log(`Department "${name}" added successfully.`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Department;
