const mysql = require('mysql2/promise');

class Role {
  constructor(connection) {
    this.connection = connection;
  }

  async getAllRoles() {
    try {
      const [rows] = await this.connection.query('SELECT * FROM role');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async addRole(title, salary, departmentId) {
    try {
      await this.connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
      console.log(`Role "${title}" added successfully.`);
    } catch (error) {
      throw error;
    }
  }
 
  async deleteRole(roleId) {
    try {
      await this.connection.query('DELETE FROM role WHERE id = ?', [roleId]);
      console.log('Role deleted successfully.');
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Role;
