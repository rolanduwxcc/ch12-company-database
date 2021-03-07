const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const Company = require("./lib/Company");
const ScreenManager = require("inquirer/lib/utils/screen-manager");

const myCompany = new Company("Rolanduwxcc", 2021);
console.log(myCompany.printInfo());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "the password",
  database: "companyDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  console.clear();
  mainMenu();
});

mainMenu = () => {
  myCompany.printInfo();
  console.log(`
    ===========================
    Please Select an Option
    ===========================
    `);
  inquirer
    .prompt([
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
    ])
    .then(({ action }) => {
      if (action === "View Departments") {
        // myCompany.getAllDepartmentsQuery();
        getAllDepartments();
      } else if (action === "View Roles") {
        getAllRoles();
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
};

getAllDepartments = () => {
  const query = connection.query(
    myCompany.getAllDepartmentsQuery(),
    function (err, res) {
      if (err) throw err;
      console.clear();
      console.table(res);
      mainMenu();
    }
  );
};

getAllRoles = () => {
  const query = connection.query(
    myCompany.getAllRolesQuery(),
    function (err, res) {
      if (err) throw err;
      console.clear();
      console.table(res);
      mainMenu();
    }
  );
};

getAllEmployees = () => {
    const query = connection.query(
        myCompany.getAllEmployeesQuery(),
        function (err, res) {
            if (err) throw err;
            console.clear()
            console.table(res);
            mainMenu();
        }
    );
};

addNewDep = () => {
    inquirer.prompt([
        {
            message: 'Please enter the NEW department name: ',
            type: 'input',
            name: 'depName'
        }
    ]).then(({ depName }) => { 
        connection.query(
            myCompany.addDepartmentQuery(depName),
            function (err, res) {
                if (err) throw err;
                console.clear()
                console.table(res);
                mainMenu();
            }
        );
    });
};

getDepartmentChoices = () => {
    let depList = [];
    const query = connection.query(
        myCompany.getAllDepartmentsQuery(),
        function (err, res) {
            if (err) throw err;
            depList = res.map(function (obj) { return obj.id + "-" + obj.name });
        }
    );
    return depList;
}

addNewRole = () => {
    inquirer.prompt([
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
            type: 'list',
            choices: getDepartmentChoices(),
            name: 'depId'
        }
    ]).then(({title, salary, depId}) => {
        const query = connection.query(
            myCompany.addRoleQuery(title, salary, depId),
            function (err, res) {
                if (err) throw err;
                console.clear();
                console.table(res);
                mainMenu();
            }
        );
    })
};

// addNewEmployee = (fName,lName,role,manager) => {
//     console.log('Adding new employee...\n');
//     const query = connection.query(
//         myCompany.addEmployeeQuery(fName, lName, role, manager),
//         function (err, res) {
//             if (err) throw err;
//             console.table(res);
//             updateRole(15,7);
//         }
//     );
// };

// updateRole = (empId, role) => {
//     console.log('Adding new employee...\n');
//     const query = connection.query(
//         myCompany.updateEmployeeRoleQuery(empId, role),
//         function (err, res) {
//             if (err) throw err;
//             console.table(res);
//             connection.end();
//         }
//     );
// };

closeMyDatabase = () => {
    connection.end();
}