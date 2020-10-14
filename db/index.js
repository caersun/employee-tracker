const connection = require("connection"); 
const inquirer = require("inquirer");
const cTable = require("console.table");

class DB { // do i need this?
    constructor(department, role, employee) {
        this.department = department;
        this.role = role;
        this.employee = employee;
    }

    // methods to query?
    // how to connect classes below to up here for database organization?
}

class Department { // come back to this
    constructor(name) {
        this.name = name;
    }

    // Create
    addDepartment() {};

    // Read
    viewDepartments() {
        const query = "SELECT * FROM department";

        connection.query(query, (err, res) => {
            if (err) throw err;

            const table = cTable.getTable(res);
            console.log(table);

            // need a way to get back to start screen? can be done in ../index.js??
        })
    };

    // Update
    updateDepartment() {};

    // Delete
    deleteDepartment() {};
};

class Role {
    constructor(title, salary, department_id) { // come back to these
        this.title = title;
        this.salary = salary;
        this.department_id = department_id; // do we need departmentId?
    }

    
    // Create
    addRole() {};

    // Read
    viewRoles() {};

    // Update
    updateRole() {};

    // Delete
    deleteRole() {};
};

class Employee {
    constructor(first_name, last_name, role_id, manager_id) { // might have to edited
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }

    // Create
    addEmployee() {};

    // Read
    viewEmployees() {};
    viewbyDept() {};
    viewByRole() {};
    viewByManager() {};

    // Update
    updateEmployeeInfo() {};
    updateRole();
    updateManager();

    // Delete
    deleteEmployee() {};
};

module.exports = {
    Department : Department,
    Role: Role,
    Employee: Employee
};