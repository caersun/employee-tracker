// Import our dependencies
const mysql = require("mysql");
// const util = require("util"); // if we want to make asynchronous come back and enable and add logic

// Create/configure our MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "$qlN1ght!",
  database: "employee_tracker_db" // come back and change names to all (in sql)
});

module.exports = connection;