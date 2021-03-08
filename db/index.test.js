//This is just for testing all the queries in the index.js

const mysql = require('mysql2');
const cTable = require("console.table");
const db = require('.');

db.findAllDepartments().then(res => {
    console.table(res[0])
})

db.findAllEmployees().then(res => {
    console.table(res[0])
})

db.findAllRoles().then(res => {
    console.table(res[0])
})

//Uncomment these out if you need to test the INSERT or UPDATE queries
// db.addDepartment('Testing',350,1).then(res => {
//     console.table(res[0])
// })

// db.addRole('Testing',350.00,7). then(res => {
//     console.table(res[0])
// })

// db.addEmployee('Sadie','Hawkins',4,7).then(res => {
//     console.table(res[0])
// })

// db.updateEmployeeRole(15,7).then(res => {
//     console.table(res[0])
// })

db.endConnection();

