const mysql = require('mysql2');
const cTable = require('console.table');
const Company = require('../lib/Company');
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
            connection.end();
        }
    );
};