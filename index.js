const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
  
   
    port: 3306,
  
    
    user: 'root',
  
    
    password: 'root',
    database: 'employeeDB',
});

connection.connect((err) => {
    if (err) throw err;
    runSearch();
});

console.log("\n 𝔼𝕞𝕡𝕝𝕠𝕪𝕖𝕖 𝕋𝕣𝕒𝕔𝕜𝕖𝕣 \n");
    StartUp();

    function StartUp(){
        inquirer
        .prompt({
          name: "action",
          type: "list",
          message: "MAIN MENU",
          choices: [
            "View all employees",
            "View all employees by role",
            "View all employees by department",
            "View all employees by manager",
            "Add employee",
            "Add role",
            "Add department",
            "Update employee role",
            "Update employee manager",
           
          ]
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
        case "View all employees by manager":
             allMngr();
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
        case "Update employee manager":
            updateEmpMngr();
            break;
        case 'Exit':
            connection.end();
            break;

        default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
    });
};

const allEmp(){

}

const allDept(){
}

const allRole(){

}

const addEmp(){

}

const addRole(){

}

const addDept(){

}

const updateEmpRole(){

}

const updateEmpMngr(){

}
