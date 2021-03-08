// create an object that relates to our database  - OBJECT RELATIONAL MAPPING ORM

const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection
    }

    findAllEmployees() {
        return this.connection.promise().query(
            `SELECT * FROM employees`
        )
    }
    findAllDepartments() {
        return this.connection.promise().query(
            `SELECT * FROM departments`)
    }

    findAllRoles() {
        return this.connection.promise().query(
            `SELECT * FROM roles`)
    }

    addDepartment(name) {
        return this.connection.promise().query(
            `INSERT INTO departments (name)
             VALUES ('${name}')`)
    }

    addRole(title, salary, departmentId) {
        return this.connection.promise().query(
            `INSERT INTO roles (title, salary, departmentId)
             VALUES ('${title}','${salary}','${departmentId}')`)
    }

    addEmployee(firstName, lastName, roleId, managerId) {
        return this.connection.promise().query(
            `INSERT INTO employees 
                (firstName, lastName, roleId, managerId)
            VALUES 
                ('${firstName}','${lastName}','${roleId}','${managerId}')
            `)
    }

    updateEmployeeRole(employeeId, newRole) {
        return this.connection.promise().query(
            `UPDATE employees SET roleId = ${newRole}
             WHERE id = ${employeeId}
            `)
    }

    endConnection() {
        connection.end();
    }

};

module.exports = new DB(connection);