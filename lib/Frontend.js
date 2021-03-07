const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Company = require('./Company');

// const myCompany = new Company("Rolanduwxcc", 2021);
// console.log(myCompany.printInfo());

class Frontend {
    constructor(companyName) {
        this.date = new Date();
        
        const myCompany = new Company(companyName, this.date.getFullYear());
    }

    startApp() {
        this.mainMenu();
    }

    endApp() {
        connection.end();
    }

    mainMenu() {
        console.clear();
        
        console.log(`
        ===========================
        Please Select an Option
        ===========================
        `);
        inquirer
            .prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: 'What would you like to do?',
                    choices: ['View Departments', 'View Roles', 'View Employees', 'Quit']
                }
            ])
            .then(({ action }) => {
                if (action === 'View Departments') {
                    this.getAllDepartmentsQuery();
                } else if (action === 'View Roles') {
                    this.company.getAllRolesQuery();
                } else if (action === 'View Employees') {
                    this.company.getAllEmployeesQuery();
                } else if (action === 'Quit') {
                    return;
                } else {
                    console.log("Problem occurred adding this employee. Try again or quit and report to developer.");                    
                    return this.mainMenu();
                }
                return this.mainMenu();
            })
    }

    getAllDepartmentsQuery() {
        const sql = `SELECT * FROM departments`;

        const query = connection.query(
            sql,
            function (err, res) {
                if (err) throw err;
                console.table(res);
            }
        );
    }


}

module.exports = Frontend;

