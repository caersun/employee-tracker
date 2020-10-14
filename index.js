/* inquirer goes here - ask user questions
switch case depending on user input
call methods db index.js i.e. db.addDepartment() */

const inquirer = require("inquirer");
const connection = require("./db/connection");
const db = require("./db/index"); // calling database that contains Department, Role, and Employee classes with CRUD methods

// Connecting to MySQL server and calling mainPrompt()
connection.connect( (err) => {
    if (err) throw err;
    mainPrompt();
});

function mainPrompt() { // Might add more to incorporate all CRUD methods and bonuses. If yes, add functionality for second screen for better UI
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "View all employees by department",
            "View all employees by role",
            "View all employees by manager",
            "Add department", 
            "Add role", 
            "Add employee",
            "Remove employee",
            "Update employee role",
            "Update employee manager",
            "exit"
        ]
    }).then(onMainPromptAnswer);
}

function onMainPromptAnswer({ action }) {
    switch (action) {
        case "View all departments":
            db.Department.viewDepartments();
            break;
        case "View all roles":
            db.Role.viewRoles();
            break;
        case "View all employees":
            db.Employee.viewEmployees();
            break;
        case "View all employees by department":
            db.Employee.viewByDept();
            break;
        case "View all employees by role":
            db.Employee.viewByRole();
            break;
        case "View all employees by manager":
            db.Employee.viewByMan();
            break;
        case "Add department":
            db.Department.addDepartment();
            break;
        case "Add role":
            db.Role.addRole();
            break;
        case "Add employee":
            db.Employee.addEmployee();
            break;
        case "Remove employee":
            db.Employee.deleteEmployee();
            break;
        case "Update employee role":
            db.Employee.updateRole();
            break;
        case "Update employee manager":
            db.Employee.updateManager();
            break;
        case "exit":
        default:
            console.log("Goodbye!");
            connection.end();
    }
};