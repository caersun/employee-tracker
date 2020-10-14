// Import our dependencies
const mysql = require("mysql");
// const util = require("util"); // what is this doing??

// Create/configure our MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "$qlN1ght!",
  database: "employee-tracker_db" // come back and change names to all (in sql)
});

// Connect to the MySQL server
// Is it necessary to do this here? Exporting in ../index.js and connecting to server there
/*
connection.connect(err => {
  if (err) {
    throw err;
  } 
});

connection.query = util.promisify(connection.query); */

module.exports = connection;