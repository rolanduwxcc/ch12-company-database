class Company {
    constructor(name,year) {
        this.name = name;
        this.year = year;
    }

    printInfo() {
        return `
---------------------------------------------------------------------
|                                                                   |
|        The hardest working people in America                      |
|       work at ${this.name} since ${this.year - 100}               |
|                                                                   |
---------------------------------------------------------------------
        `;
    }

    getName() {
        return this.name;
    }

    getYear() {
        return this.year;
    }

    getAllDepartmentsQuery() {
        return `SELECT * FROM departments`;
    }

    getAllRolesQuery() {
        return `SELECT * FROM roles`;
    }

    getAllEmployeesQuery() {
        return `SELECT * FROM employees`;
    }

    addDepartmentQuery(name) {
        return `INSERT INTO departments (name)
                VALUES ('${name}')
                `;
    }

    addRoleQuery(title, salary, departmentId) {
        return `INSERT INTO roles (title, salary, departmentId)
                VALUES ('${title}','${salary}','${departmentId}')
                `;
    }

    addEmployeeQuery(firstName, lastName, roleId, managerId) {
        const sql = `
            INSERT INTO employees (firstName, lastName, roleId, managerId)
            VALUES ('${firstName}','${lastName}','${roleId}','${managerId}')
            `;
        
        return sql;
    }

    updateEmployeeRoleQuery(employeeId, newRole) {
        const sql = `
            UPDATE employees SET roleId = ${newRole}
            WHERE id = ${employeeId}
            `;
        return sql;
    }




}

module.exports = Company;