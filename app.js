const mysql = require('mysql2');
const cTable = require('console.table');
const Company = require('./lib/Company');
const myCompany = new Company("Rolanduwxcc", 2021);
console.log(myCompany.printInfo());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'the password',
    database: 'companyDB'
});

connection.query(
    myCompany.getAllEmployeesQuery(),
    function (err, results, fields) {
        if (err) throw err;
        console.table(results);
        console.log(myCompany.getAllDepartmentsQuery());

        connection.end();
        // console.log(fields);
    }
);