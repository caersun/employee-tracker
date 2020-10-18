// Dependencies
const connection = require("./db/connection.js");
const db = require("./db/index.js"); // requiring database that contains Department, Role, and Employee classes with CRUD methods

// Connecting to MySQL server and starting app to query database
connection.connect((err) => {
    if (err) {
        throw err;
    }
    db.start(); 
});