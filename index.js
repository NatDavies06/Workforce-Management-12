const inquirer = require('inquirer');
const {
    getAllDepartments,
    getALLRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee
} = require('./db/queries');

// Start application
function start() {
    // Menu options presented by using Inquirer
    inquirer.createPromptModule([
        {
            type: 'list',
            name: 'action',
            message: ' What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a deparment',
                'Add a role',
                'Add an employee'
            ]
        }
    ]).then((answer) => {
        // Call functions based on user input
        switch (answer.action) {
            case 'View all departments':
                getAllDepartments().then((departments) => {
                    console.table(departments);
                    start();
                });
                break;
            case 'View all roles':
                getAllRoles().then((roles) => {
                    console.table(roles);
                    start();
                });
                break;
            case 'View all employees':
                getAllEmployees().then((employees) => {
                    console.table(employees);
                    start();
                });
                break;
            case 'Add a department':
                promptAddDepartment();
                break;
            case 'Add a role':
                break;
            case 'Add an employee':
                break;
        }
    });
}

// Function to prompt user to add a department
function promptAddDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        }
    ]).then((answer) => {
        addDepartment(answer.name).then(() => {
            console.log('Department added successfully!');
            start();
        }).catch((err) => {
            console.log('Error adding department:', err);
            start();
        });
    });
}

// Start function to begin the application
start();
