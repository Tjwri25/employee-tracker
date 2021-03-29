DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

----- Create Department table -----
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

----- Create Role Table -----
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

----- Create Employee Table -----
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);

INSERT INTO department (id, name)
VALUES (1, "Parks Department");

INSERT INTO department (id, name)
VALUES (2, "City Department");

INSERT INTO department (id, name)
VALUES (3, "City Council");
----------
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Director", 120000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Deputy Director", 90000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Assistant", 35000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Administrator", 65000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Office Manager", 75000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, "City Manager", 160000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "Assistant City Manager", 135000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, "City Council", 52000, 3);

----------
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Chris", "Traeger", 6, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Ron", "Swanson", 1, 8);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Leslie", "Knope", 2, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "April", "Ludgate-Dwyer", 3, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Andrew", "Dwyer", 3, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Tom", "Haverford", 4, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Gary", "Gergich", 4, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Donna", "Meagle", 5, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, "Ben", "Wyatt", 7, 8);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, "Jeremy", "Jamm", 8, 8);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (11, "Bill", "Dexhart", 8, 8);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (12, "Douglass", "Houser", 8, 8);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (13, "Fielding", "Milton", 8, 8);







