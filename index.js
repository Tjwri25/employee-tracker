const mysql = require('mysql');
const inquirer = require('inquirer');
require('dotenv').config();


const connection = mysql.createConnection({
    host: 'localhost',


    port: 3306,


    user: 'root',


    password: process.env.password,
    database: 'employeeDB',
});

connection.connect((err) => {
    if (err) throw err;
    console.log("\n πΌππ‘ππ πͺππ ππ£πππππ£ \n");
    mainMenu();
});


function mainMenu() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "MAIN MENU",
            choices: [
                "View all employees",
                "View all employees by role",
                "View all employees by department",
                "Add employee",
                "Add role",
                "Add department",
                "Update employee role",


            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "View all employees":
                    allEmp();
                    break;
                case "View all employees by role":
                    allRole();
                    break;
                case "View all employees by department":
                    allDept();
                    break;
                case "Add employee":
                    addEmp();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add department":
                    addDept();
                    break;
                case "Update employee role":
                    updateEmpRole();
                    break;
                case 'Exit':
                    connection.end();
                    break;

            }
        });
};

const allEmp = () => {


    const query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";
    connection.query(query, function (err, data) {
        if (err) throw err;
        console.table(data);
        mainMenu();
    });
}

const allDept = () => {
    const query = "SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;";
    connection.query(query, function (err, data) {
        if (err) throw err;
        console.table(data);
        mainMenu();
    });

},


    allRole = () => {
        const query = "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;";
        connection.query(query, function (err, data) {
            if (err) throw err;
            console.table(data);
            mainMenu();
        });

    },

    addEmp = () => {
        connection.query("SELECT * FROM role", function (err, data) {
            if (err) throw err;

            inquirer
                .prompt([
                    {
                        name: "first_name",
                        type: "input",
                        message: "What is the employee's first name? ",
                    },
                    {
                        name: "last_name",
                        type: "input",
                        message: "What is the employee's last name? "
                    },
                    {
                        name: "role",
                        type: "list",
                        choices: function () {
                            var roleList = [];
                            for (let i = 0; i < data.length; i++) {
                                roleList.push(data[i].title);
                            }
                            return roleList;
                        },
                        message: "What is the employee's role? "
                    },
                    {
                        type: "input",
                        message: "What is the manager id number?",
                        name: "managerID"
                    }

                ]).then(function (answer) {
                    let roleID;
                    for (let x = 0; x < data.length; x++) {
                        if (data[x].title == answer.role) {
                            roleID = data[x].id;
                            console.log(roleID)
                        }

                    }
                    let managerID;
                    for (let k = 0; k < data.length; k++) {
                        if (data[k].title == answer.manager) {
                            managerID = data[k].id;
                            console.log(managerID)
                        }
                    }


                    connection.query(
                        "INSERT INTO employee SET ?",
                        {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            role_id: roleID,
                            manager_id: answer.managerID
                        },
                        (err) => {
                            if (err)
                                throw err;
                            console.log(`Successfully added ${answer.first_name} ${answer.last_name} to Employees`);
                            mainMenu();
                        }
                    )
                })
        })
    }

addDept = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: 'What is the name of the Department you would like to add?'
            }

        ]).then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.newDepartment,
                });

            console.log(`${answer.newDepartment} has successfully been added to Departments`);
            mainMenu();


        })
};





addRole = () => {

    inquirer
        .prompt([
            {
                type: "input",
                name: "newRole",
                message: "What's the name of this role?"

            },
            {
                type: "input",
                name: "addSal",
                message: "What is the salary for this role?"

            },
            {
                type: "input",
                name: "deptId",
                message: "What is the department id number?"

            }
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.newRole,
                    salary: answer.addSal,
                    department_id: answer.deptId
                });

            console.log(`${answer.newRole} has successfully been added to Roles`);
            mainMenu();


        })
};
addRole = () => {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", function (err, res) {
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of this role"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of this role?"

            },
            {
                name: "deptId",
                type: "input",
                message: "What is the department id number?"

            }
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.deptId
                },
                (err) => {
                    if (err)
                        throw err;
                    console.log(`${answer.title} has successfully been added to Roles`);
                    mainMenu();
                }
            )

        });
    });
}

updateEmpRole = () => {


        inquirer
            .prompt([
                {

                    name: "pickEmp",
                    type: "input",
                    message: "What is the ID number of the employee you'd like to update?"

                },
                {
                    name: "updateRole",
                    type: "input",
                    message: "What is the employees new role ID?"

                },
            ]).then(function (answer) {
                connection.query(
                    "UPDATE employee SET ? WHERE ?",
                        [{
                        role_id: answer.updateRole},
                        {
                        id: answer.pickEmp,
                        },],
                    (err) => {
                        if (err)
                            throw err;
                        console.log("Employee's role has sucessfully been updated");
                        mainMenu();
                    }
                );

            });
    
}




