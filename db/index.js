// create an object that relates to our database  - OBJECT RELATIONAL MAPPING ORM

const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection
    }

    findAllEmployees() {
        return this.connection.promise().query(
            // `SELECT * FROM employees`
            `SELECT e.id, e.firstName, e.lastName, title, name dept, salary, CONCAT(m.firstName,' ',m.lastName) manager FROM employees e LEFT
            JOIN roles ON e.roleId = roles.id LEFT JOIN departments ON roles.departmentId = departments.id LEFT JOIN employees m ON e.managerId = m.id;`
        )
    }
    findAllDepartments() {
        return this.connection.promise().query(
            `SELECT id, name FROM departments`)
    }

    findAllRoles() {
        return this.connection.promise().query(
            // `SELECT * FROM roles`
            `SELECT r.id, r.title, name dept, salary FROM roles r LEFT JOIN departments ON r.departmentId = departments.id`
        )
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