
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

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    //start the inquiry
});


connection.query(
    myCompany.getAllDepartmentsQuery(),
    function (err, results, fields) {
        if (err) throw err;
        //return results in nice table
        console.table(results);
        //return query
        console.log(myCompany.getAllDepartmentsQuery());
        //return results as normal
        console.log(results);

        results.forEach(element => {
            console.log(element.id + " - " + element.name);
        });

        var testArray = results.map(function (obj) {
            return obj.id + "-" + obj.name;
        })
        console.log(testArray);

        connection.end();
        // console.log(fields);
    }
);
