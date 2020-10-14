const connection = require("connection"); // does it need to be "connection.js"? check this

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
    viewDepartments() {};

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