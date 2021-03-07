const inquirer = require('inquirer')
const mysql = require('mysql2')
const cTable = require('console.table')

const db = require('./db/')

//main questions
const mainQuestions = [
    {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Departments",
            "View Roles",
            "View Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Quit",
        ],
    },
]

const addDepartmentQuestions = [
    {
        message: 'Enter the NEW department name: ',
        type: 'input',
        name: 'name'
    }
]

const addRoleQuestions = [
    {
        message: 'Enter the NEW role name: ',
        type: 'input',
        name: 'title'
    },
    {
        message: 'Enter the salary for this role: $',
        type: 'number',
        name: 'salary'
    },
    {
        message: 'Enter the department for this role: ',
        type: 'number',
        name: 'depId'
    }
]

const addEmployeeQuestions = [
    {
        message: 'Enter the employee FIRST name: ',
        type: 'input',
        name: 'firstName'
    },
    {
        message: 'Enter the employee LAST name: ',
        type: 'input',
        name: 'lastName'
    },
    {
        message: 'Enter the role id: ',
        type: 'number',
        name: 'roleId'
    },
    {
        message: 'Enter the department id for this employee: ',
        type: 'number',
        name: 'depId'
    }
]

function menu() {
    inquirer.prompt(mainQuestions).then(({action}) => {
        if (action === "View Departments") {
            db.findAllDepartments().then(res => {
                console.clear()
                console.table(res[0])
                menu()
            })
        } else if (action === "View Roles") {
            db.findAllRoles().then(res => {
                console.clear()
                console.table(res[0])
                menu()
            });
        } else if (action === "View Employees") {
            db.findAllEmployees().then(res => {
                console.clear()
                console.table(res[0])
                menu()
            })
        } else if (action === "Add Department") {
            inquirer.prompt(addDepartmentQuestions).then(({name}) => {
                db.addDepartment(name).then(res => {
                    console.clear()
                    console.log('Department ' + res[0].insertId + ' was added')
                })
                db.findAllDepartments().then(res => {
                    console.table(res[0])
                    menu()
                })
            })
        } else if (action === "Add Role") {
            inquirer.prompt(addRoleQuestions).then(({title, salary, depId}) => {
                db.addRole(title, salary, depId).then(res => {
                    console.clear()
                    console.log('Role ' + res[0].insertId + ' was added')
                })
                db.findAllRoles().then(res => {
                    console.table(res[0])
                    menu()
                })
            })
        } else if (action === "Add Employee") {
            inquirer.prompt(addEmployeeQuestions).then(({firstName,lastName,roleId,depId}) => {
                db.addEmployee(firstName,lastName,roleId,depId).then(res => {
                    console.clear()
                    console.log('Employee ' + res[0].insertId + ' was added')
                })
                db.findAllEmployees().then(res => {
                    console.table(res[0])
                    menu()
                })
            })
        } else if (action === "Update Employee Role") {
            return db.endConnection()
        } else if (action === "Quit") {
            return db.endConnection()
        }
    })
}

menu()