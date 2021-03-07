//This just runs all the queries
//Just to test

const mysql = require('mysql2');
const cTable = require('console.table');
const Company = require('./lib/Company');
const ScreenManager = require('inquirer/lib/utils/screen-manager');
const myCompany = new Company("Rolanduwxcc", 2021);
console.log(myCompany.printInfo());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'the password',
    database: 'companyDB'
});

// connection.query(
//     myCompany.getAllEmployeesQuery(),
//     function (err, results, fields) {
//         if (err) throw err;
//         console.table(results);
//         console.log(myCompany.getAllDepartmentsQuery());

//         connection.end();
//         // console.log(fields);
//     }
// );

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    getAllDepartments();
});

getAllDepartments = () => {
    console.log('Getting all departments...\n');
    const query = connection.query(
        myCompany.getAllDepartmentsQuery(),
        function (err, res) {
            if (err) throw err;
            console.table(res);
            getAllRoles();
        }
    );
    // logs the actual query being run
    console.log(query.sql);
};
  
getAllRoles = () => {
    console.log('Getting all roles...\n');
    const query = connection.query(
        myCompany.getAllRolesQuery(),
        function (err, res) {
            if (err) throw err;
            console.table(res);
            getAllEmployees();
        }
    );
};

getAllEmployees = () => {
    console.log('Getting all employees...\n');
    const query = connection.query(
        myCompany.getAllEmployeesQuery(),
        function (err, res) {
            if (err) throw err;
            console.table(res);
            addNewDep('Testing');
        }
    );
};

addNewDep = (depName) => {
    console.log('Adding a new department...\n');
    connection.query(
        myCompany.addDepartmentQuery(depName),
        function (err, res) {
            if (err) throw err;
            console.table(res);
            addNewRole('Testing', 350, 1);
        }
    );
};

addNewRole = (title, salary, depId) => {
    console.log('Adding a new role...\n');
    const query = connection.query(
        myCompany.addRoleQuery(title, salary, depId),
        function (err, res) {
            if (err) throw err;
            console.table(res);
            addNewEmployee('Sadie', 'Hawkins', 3, 2);
        }
    );
};

addNewEmployee = (fName,lName,role,manager) => {
    console.log('Adding new employee...\n');
    const query = connection.query(
        myCompany.addEmployeeQuery(fName, lName, role, manager),
        function (err, res) {
            if (err) throw err;
            console.table(res);
            updateRole(15,7);
        }
    );
};

updateRole = (empId, role) => {
    console.log('Adding new employee...\n');
    const query = connection.query(
        myCompany.updateEmployeeRoleQuery(empId, role),
        function (err, res) {
            if (err) throw err;
            console.table(res);
            connection.end();
        }
    );
};