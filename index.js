const inquirer = require('inquirer');
const mysql = require('mysql2');
const { allEmployees, updateEmployee } = require('./db');
const db = require('./db');
require('console.table')


//beginning 
menu = () => {

    inquirer
        
        .prompt([
            {
                type: "list",
                name: "operation",
                message: "What operation would you like to perform?",
                choices: ["View departments", "View roles", "View employees", "Add a department", "Add a role", "Add employee", "Update employee role", "Exit"]
            }
        ])
        .then(({ operation }) => {

            switch (operation) {

                case "View departments":
                    allTheDepartments();
                    break;

                case "View roles":
                    allTheRoles();
                    break;

                case "View employees":
                    allTheEmployees();
                    break;

                case "Add a department":
                    createDepartment();
                    break;

                case "Add a role":
                    createRole();
                    break;

                case "Add employee":
                    createEmployee();
                    break;

                case "Update employee role":
                    // updateAnEmployee();
                    break;

                default:
                    console.log(`exit.`);
                    process.exit();
                    break;
            }



        })

}

function allTheDepartments() {

    db.allDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);

        }).then(() => menu())


};

function createDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of this department?"

            }
        ]).then(res => {
            let newDepartment = res;
            db.addDepartment(newDepartment)
                .then(() =>
                    console.log(`department added.`))
                .then(() => menu())
        })
}



function allTheRoles() {

    db.allRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);

        }).then(() => menu())


};

function createRole() {

    db.allDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log(departments);

            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "id",
                        message: "What is the department id?"


                    },
                    {
                        type: "input",
                        name: "name",
                        message: "What is the name of the role?"
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "What is salary for the role?"
                    }
                ])

                .then(({ name, salary, id }) => {
                    console.log(name, salary, id);
                    db.addRoles(name, salary, id);
                    console.log(`Role added.`)
                })



                .then(() => menu())
        })
}


function allTheEmployees() {

    db.allEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);

        }).then(() => menu())


};


function createEmployee() {

    db.onlyManagers()
        .then(([rows]) => {
            let roles = rows;
            console.table(roles);
        })

    db.onlyRoles()
        .then(([rows]) => {
            let roles = rows;
            console.table(roles);

            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "firstName",
                        message: "enter your first name"
                    },
                    {
                        type: "input",
                        name: "lastName",
                        message: "enter your last name?"
                    },
                    {
                        type: "input",
                        name: "position",
                        message: "What is your role id"
                    },
                    {
                        type: "input",
                        name: "manager",
                        message: "What is your manager id"
                    }
                ]).then(({ firstName, lastName, position, manager }) => {
                    console.log(firstName, lastName, position, manager);
                    db.addEmployee(firstName, lastName, position, manager)
                    console.log(`Employee added.`)
                }).then(() => menu())
        })
}

menu();