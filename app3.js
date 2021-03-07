const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const Company = require("./lib/Company");
const ScreenManager = require("inquirer/lib/utils/screen-manager");
const db = require('./db');

// const myCompany = new Company("Rolanduwxcc", 2021);
// console.log(myCompany.printInfo());

function welcomeBanner() {
    console.log("Hello Company Man");
}

function menu() {
    inquirer.prompt([
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
    ]).then(({ action }) => {
        if (action === "View Departments") {
            // myCompany.getAllDepartmentsQuery();
            db.findAllDepartments()
        } else if (action === "View Roles") {
            db.findAllRoles();
        } else if (action === "View Employees") {
            getAllEmployees();
        } else if (action === "Add Department") {
            addNewDep();
        } else if (action === "Add Role") {
            addNewRole();
        } else if (action === "Add Employee") {
            connection.end();
        } else if (action === "Update Employee Role") {
            connection.end();
        } else if (action === "Quit") {
            return closeMyDatabase();
        } else {
            console.log(
                "Problem occurred choosing. Try again or report to developer."
            );
            return closeMyDatabase();
        }
    });
}

getAllEmployees = () => {
    db.findAllEmployees().then(employees => {
        console.clear()
        console.table(employees);
        // mainMenu();
    })
};

// addNewDep = () => {
//     inquirer.prompt([
//         {
//             message: 'Please enter the NEW department name: ',
//             type: 'input',
//             name: 'depName'
//         }
//     ]).then(({ depName }) => { 
//         connection.query(
//             myCompany.addDepartmentQuery(depName),
//             function (err, res) {
//                 if (err) throw err;
//                 console.clear()
//                 console.table(res);
//                 mainMenu();
//             }
//         );
//     });
// };

// getDepartmentChoices = () => {
//     return db.getAllDepartments().then(departmentData => {
//         return departmentList.map(obj => obj.id + '-' + obj.name)
//     })
// }

// addNewRole = () => {
//   getDepartmentChoices().then(choices => {
//       inquirer.prompt([
//           {
//               message: 'Enter the NEW role name: ',
//               type: 'input',
//               name: 'title'
//           },
//           {
//               message: 'Enter the salary for this role: $',
//               type: 'number',
//               name: 'salary'
//           },
//           {
//               message: 'Enter the department for this role: ',
//               type: 'list',
//               choices: choices,
//               name: 'depId'
//           }
//       ]).then(({title, salary, depId}) => {
//           const query = connection.query(
//               myCompany.addRoleQuery(title, salary, depId),
//               function (err, res) {
//                   if (err) throw err;
//                   console.clear();
//                   console.table(res);
//                   mainMenu();
//               }
//           );
//       })

//   })
// };

// closeMyDatabase = () => {
//     connection.end();
// }

//Start the menus
// mainMenu()
welcomeBanner();
menu();
