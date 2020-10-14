DROP DATABASE IF EXISTS employee-tracker_db;
CREATE employee-tracker_db;

USE employee-tracker_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(128) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(128) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    INDEX dep_ind (department_id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    role_id INT NOT NULL,
    INDEX role_ind (role_id),
    manager_id INT NOT NULL,
    INDEX manager_ind (manager_id),
    PRIMARY KEY (id)
);