const connection = require("connection"); 
const inquirer = require("inquirer");
const cTable = require("console.table");

// Check if this even works
// let db = new DB(department, role, employee);
let department = new Department(name);
let role = new Role(title, salary, department_id);
let employee = new Employee(first_name, last_name, role_id, manager_id);

class DB { // do i need this?
    constructor(department, role, employee) {
        this.department = department;
        this.role = role;
        this.employee = employee;
    }
};

class Department { 
    constructor(name) { // what to do with constructor? need to call at least once for this instance (prob)
        this.name = name;
    }

    // Create
    addDepartment() {
        inquirer.prompt([ // does this need to be an array?
            // Ask user for name of new department
            {
                name: "name",
                type: "input",
                message: "What is the name of the new department?"
            }
        ]).then((data) => {
            const query = "INSERT INTO department SET ?"; 
            const values = { name: data.name }

            connection.query(query, values, (err, res) => {
                if (err) throw err;

                // Success!
                console.log("New department added to database!"); // what is the template literal to display new name of department
            });
        });
    };

    // Read
    viewDepartments() {
        const query = "SELECT * FROM department";

        connection.query(query, (err, res) => {
            if (err) throw err;

            const table = cTable.getTable(res);
            console.log(table);
        });
    };

    // Update
    updateDepartment() { 
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the id of the department you would like to update?"
            },
            {
                name: "name",
                type: "input",
                message: "Update department name to: "
            }
        ]).then((data) => {
            const query = "UPDATE department SET ? WHERE ?"; 
            const values = [
                {
                    name: data.name
                },
                {
                    id: data.id
                }
            ];

            connection.query(query, values, (err, res) => {
                if (err) throw err;

                // Success
                console.log("You've updated a department name!");
            });
        });
    };

    // Delete
    deleteDepartment() {
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the department you want to delete?" // TODO: choices array from existing
            }
        ]).then(data => {
            const query = "DELETE FROM department WHERE ?";
            const values = { id: data.id };

            connection.query(query, values, (err, res) => {
                if (err) throw err;

                // Success!
                console.log("You've deleted a department from the database!");
            });
        });
    };

    // Aiming to get to this point: 
    /*
    deleteDepartment(department_id) {
        const query = "DELETE FROM department WHERE id = ?";

        connection.query(query, department_id, (err, res) => {
            if (err) throw err;

            const table = cTable.getTable(res);
            console.log(table);
        });
    }; */
};

class Role {
    constructor(title, salary, department_id) { // come back to these
        this.title = title;
        this.salary = salary;
        this.department_id = department_id; // do we need departmentId?
    }

    // Create
    addRole() { // bonus TODO
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the new role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the new role?"
            },
            { // TODO: Make it so instead of inputting department_id, we can grab an existing department db and display as choices
                name: "department_id",
                type: "input",
                message: "What is the Department ID of new role?"
            }
        ]).then((data) => {
            const query = "INSERT INTO role SET ?"; 
            const values = {
                title: data.title,
                salary: data.salary,
                department_id: data.department_id
            };

            connection.query(query, values, (err, res) => {
                if (err) throw err;

                // Success!
                console.log("A new table has been added to the database!");
            });
        });
    };

    // Read
    viewRoles() {
        const query = "SELECT * FROM role";
        connection.query(query, (err, res) => {
            if (err) throw err;

            const table = cTable.getTable(res);
            console.log(table);
        })
    };

    // Update
    updateRole() {
        inquirer.prompt({
                name: "roleOptions",
                type: "rawlist",
                message: "What would you like to do?",
                choices: [
                    "Update role title",
                    "Update role salary",
                    "Update role department designation",
                    "back"
                ]
            }).then(onUpdateRole);
    }; 

    onUpdateRole({ roleOptions }) { 
        switch (roleOptions) {
            case "Update role title":
                this.updateRoleTitle();
                break;
            case "Update role salary":
                this.updateRoleSalary();
                break;
            case "Update role department designation":
                this.updateRoleDepartment();
                break;
            case "back":
            default: 
                mainPrompt();
                console.log("Trying to return to the main page!");
        }
    }

    updateRoleTitle() {
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the role you would like to update?"
            },
            {
                name: "title",
                type: "input",
                message: "Update role title to: "
            }
        ]).then(data => {
            const query = "UPDATE role SET ? WHERE ?";
            const values = [
                { title: data.title },
                { id: data.id }
            ];

            connection.query(query, values, (err, res) => {
                if (err) throw err;

                // Success
                console.log("You've updated a role title!");
            });
        });
    };

    updateRoleSalary() {
        inquirer.prompt([
            {
                name: "id",
                input: "input",
                message: "What is the id of the role you would like to update?"
            },
            {
                name: "salary",
                type: "input",
                message: "Update role salary to: "
                // bonus TODO: add a validator
            }
        ]).then(data => {
            const query = "UPDATE role SET ? WHERE ?";
            const values = [
                { salary: data.salary },
                { id: data.id }
            ];

            connection.query(query, values, (err, res) => {
                if (err) throw err;

                // Success
                console.log("You've updated a role salary!");
            });
        });
    };

    updateRoleDepartment() {
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the role you would like to update?"
            },
            {
                name: "department_id",
                type: "input",
                message: "What is the ID of the department you would like to designate the role to?" // bonus TODO: make from existing array of department
            }
        ]).then(data => {
            const query = "UPDATE role SET ? WHERE ?";
            const values = [
                { department_id: data.department_id },
                { id: data.id }
            ];

            connection.query(query, values, (err, res) => {
                if (err) throw err;

                // Success
                console.log("You've updated a role's department!");
            });
        });
    };

    /*
    updateRole(employee_id, role_id) {
        const query = "UPDATE employee SET role_id = ? WHERE id = ?";

        connection.query(query, [role_id, employee_id], (err, res) => {
            if (err) throw err;

            const table = cTable.getTable(res);
            console.log(table);
        });
    }; */

    // Delete
    deleteRole() {
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the role you would like to delete?"
            }
        ]).then(data => {
            const query = "DELETE FROM role WHERE ?";
            const values = { id: data.id }; 

            connection.query(query, values, (err, res) => {
                if (err) throw err;

                // Success!
                console.log("You've deleted a role from the database!");
            });
        });
    };
    
    /*
    deleteRole(role_id) {
        const query = "DELETE FROM role WHERE id = ?";

        connection.query(query, role_id, (err, res) => {
            if (err) throw err;

            const table = cTable.getTable(res);
            console.log(table);
        });
    }; */
};

class Employee { // TODO: 
    constructor(first_name, last_name, role_id, manager_id) { // might have to edited
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }

    // Create
    addEmployee() { // bonus TODO
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "First name: "
            },
            {
                name: "last_name",
                type: "input",
                message: "Last name: "
            },
            { // TODO: Make type: "choices" from existing array
                name: "role_id",
                type: "input",
                message: "What role does the employee have?"
            },
            { // TODO: Make types: "choices" from existing array from database or can be null (?) if new employee is a manager
                name: "manager_id",
                type: "input",
                message: "Who is the employee's manager?" // Add leave blank if not manager? auto null?
            }
        ]).then((data) => {
            const query = "INSERT INTO employee SET ?";
            const values = {
                first_name: data.first_name,
                last_name: data.last_name,
                role_id: data.role_id,
                manager_id: data.manager_id
            };

            connection.query(query, values, (err, res) => {
                if (err) throw err;

                // Success!
                console.log("We added a new employee to the database!");
            });
        });
    };

    // Read
    viewEmployees() {
        inquirer.prompt({
            name: "byType",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View employees by department",
                "View employees by role",
                "View employees by manager",
                "back"
            ]
        }).then(onViewEmployees);
    };

    onViewEmployees({ byType }) {
        switch (byType) {
            case "View all employees":
                this.viewAllEmployees;
                break;
            case "View employees by department":
                this.viewbyDept;
                break;
            case "View employees by role":
                this.viewByRole;
                break;
            case "View employees by manager":
                this.viewByManager;
                break;
            case "back":
            default:
                mainPrompt()
                console.log("Trying to return to the main page");
        }
    };

    viewAllEmployees() {
        const query = "SELECT * FROM employee";
        connection.query(query, (err, res) => {
            if (err) throw err;

            const table = cTable.getTable(res);
            console.log(table);
        });
    };

    viewbyDept() { // TODO
        const query = "TODO: tryna view employees by department";
        const baseQuery = `SELECT e1.id AS EMPID, e1.first_name AS FName, e1.last_name AS LName, role.title AS Title, department.name AS Department, role.salary AS Salary, 
        CONCAT(e2.first_name, " ", e2.last_name) AS Manager 
        FROM employee AS e1
        LEFT JOIN role on e1.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS e2 ON e2.id=e1.manager_id
        ORDER BY department ASC;`;
        const queryOpt2 = `SELECT e.first_name, e.last_name, r.title, r.salary, 
        CONCAT(e1.first_name, " ", e1.last_name) as manager 
        FROM employee e
        INNER JOIN role r ON e.role_id = r.id 
        LEFT JOIN employee e1 ON e.manager_id = e1.id
        WHERE r.department_id = ?`;

        console.log(query);
        
        /*
        connection.query(query, (err, res) => {
            if (err) throw err;

            const table = cTable.getTable(res);
            console.log(table);
        }); */
    };

    viewByManager() { // TODO
        const query = "TODO: tryna view employees by manager";
        const queryOpt1 = `SELECT CONCAT(e2.first_name, " ", e2.last_name) AS Manager, e1.id AS EMPID, e1.first_name AS FName, e1.last_name AS LName, role.title AS Title, department.name AS Department, role.salary AS Salary 
        FROM employee AS e1
        LEFT JOIN role on e1.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        INNER JOIN employee AS e2 on e2.id=e1.manager_id
        ORDER BY manager ASC;`;
        const queryOpt2 = `SELECT e.first_name, e.last_name, r.title, r.salary, 
        CONCAT(e1.first_name, " ", e1.last_name) as manager 
        FROM employee e
        INNER JOIN role r ON e.role_id = r.id 
        LEFT JOIN employee e1 ON e.manager_id = e1.id
        WHERE r.department_id = ?`;
       
        console.log(query);
        /*
        connection.query(query, (err, res) => {
            if (err) throw err;

            const table = cTable.getTable(res);
            console.log(table);
        }); */
    };

    viewByRole() { // TODO
        const query = "TODO: tryna view employees by role";
        // const baseQuery = "";
        console.log(query);
        /*
        connection.query(query, (err, res) => {
            if (err) throw err;

            const table = cTable.getTable(res);
            console.log(table);
        });*/
    };

    // Update
    updateEmployee() {
        inquirer.prompt({
                name: "employeeOptions",
                type: "rawlist",
                message: "What would you like to do?",
                choices: [
                    "Update employee name",
                    "Update employee's role",
                    "Update employee's manager",
                    "back"
                ]
        }).then(onUpdateEmployee);
    };

    onUpdateEmployee({ employeeOptions }) { 
        switch (employeeOptions) {
            case "Update employee name":
                this.updateName();
                break;
            case "Update employee's role":
                this.updateRole();
                break;
            case "Update employee's manager":
                this.updateManager();
                break;
            case "back":
            default:
                mainPrompt();
                console.log("Trying to return to the main page!");
        }
    }
    
    updateName() { 
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the employee you would like to update?"
            },
            {
                name: "first_name",
                type: "input",
                message: "Update first name: "
            },
            {
                name: "last_name",
                type: "input",
                message: "Update last name: "
            }
        ]).then(data => {
            const query = "UPDATE employee SET ? WHERE ?"; 
            const values = [
                { 
                    first_name: data.first_name,
                    last_name: data.last_name 
                },
                { id: data.id }
            ];

            connection.query(query, values, (err, res) => {
                if (err) throw err;

                // Success
                console.log("You've updated an employee's name!");
            });
        });
    };

    updateRole() {
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the employee you would like to update?"
            },
            {
                name: "role_id",
                type: "input",
                message: "What is the ID of the role you would like to update to?"
            }
        ]).then(data => {
            const query = "UPDATE employee SET ? WHERE ?";
            const values = [
                { role_id: data.role_id },
                { id: data.id }
            ];

            connection.query(query, values, (err, res) => {
                if (err) throw err;

                // Success
                console.log("You've update the employee's role!");
            });
        });
    };
    
    /*
    updateRole(employee_id, role_id) { // how called in like this 
        const query = "UPDATE employee SET role_id = ? WHERE id = ?";

        connection.query(query, [role_id, employee_id], (err, res) => {
            if (err) throw err;

            const table = cTable.getTable(res);
            console.log(table);
        });
    }; */

    updateManager() {
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the employee you would like to update?"
            },
            {
                name: "manager_id",
                type: "input",
                message: "Update to manager with ID: "
            }
        ]).then(data => {
            const query = "UPDATE employee SET ? WHERE ?";
            const values = [
                { manager_id: data.manager_id },
                { id: data.id }
            ];

            connection.query(query, values, (err, res) => {
                if (err) throw err;

                // Success
                console.log("You've updated the employee's manager!");
            });
        });
    };

    /*
    updateManager(employee_id, manager_id) {
        const query = "UPDATE employee SET manager_id = ? WHERE id = ?";

        connection.query(query, [manager_id, employee_id], (err, res) => {
            if (err) throw err;

            const table = cTable.getTable(res);
            console.log(table);
        });
    }; */

    // Delete
    deleteEmployee() {
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the employee you want to delete?"
            }
        ]).then(data => {
            const query = "DELETE FROM employee WHERE ?";
            const values = { id: data.id };

            connection.query(query, values, (err, res) => {
                if (err) throw err;

                // Success!
                console.log("You've deleted an employee form the database!");
            })
        })
    }

    /*
    deleteEmployee(employee_id) {
        const query = "DELETE FROM employee WHERE id = ?";

        connection.query(query, employee_id, (err, res) => {
            if (err) throw err;

            const table = cTable.getTable(res);
            console.log(table);
        });
    }; */
};

function start() { // TODO: Add init logic to initialize database
    // logic to initialize the db
    // how?
    mainPrompt();
};

function mainPrompt() { // bonus TODO: Add bonuses 
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View employee details",
            "Update existing departments",
            "Update existing roles",
            "Update existing employees",
            "Add department",
            "Add role",
            "Add employee",
            "Delete department",
            "Delete role",
            "Delete employee",
            "exit"
        ]
    }).then(onMainPromptAnswer);
};

function onMainPromptAnswer({ action }) { 
    switch (action) {
        case "View all departments":
            department.viewDepartments();
            mainPrompt();
            break;
        case "View all roles":
            role.viewRoles();
            mainPrompt();
            break;
        case "View employee details":
            employee.viewEmployees();
            mainPrompt();
            break;
        case "Update existing departments":
            department.updateDepartment();
            mainPrompt();
            break;
        case "Update existing roles":
            role.updateRole();
            mainPrompt();
            break;
        case "Update existing employees":
            employee.updateEmployee();
            mainPrompt();
            break;
        case "Add department":
            department.addDepartment();
            mainPrompt();
            break;
        case "Add role":
            role.addRole();
            mainPrompt();
            break;
        case "Add employee":
            employee.addEmployee();
            mainPrompt();
            break;
        case "Delete department":
            department.deleteDepartment();
            mainPrompt();
            break;
        case "Delete role":
            role.deleteRole();
            mainPrompt();
            break;
        case "Delete employee":
            employee.deleteEmployee();
            mainPrompt();
            break;
        case "exit":
        default: 
            console.log("Goodbye!")
            connection.end();
    };
};

module.exports = {
    start: start,
};