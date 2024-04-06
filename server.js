const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extend: false }));
app.use(express.json());

// Connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'employee_db'
});

// Connect to the database
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the employee database.');
  startApp();
});

// Function to display main menu and handle user input
function startApp() {
  inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ]
  }).then(answer => {
    switch (answer.action) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        connection.end();
        break;
    }
  });
}

// Function to view all departments
function viewDepartments() {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// Function to view all roles
function viewRoles() {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// Function to view all employees
function viewEmployees() {
  const query = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// Function to add a department
function addDepartment() {
  inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the name of the new department:'
  }).then(answer => {
    connection.query('INSERT INTO department SET ?', { name: answer.name }, (err, res) => {
      if (err) throw err;
      console.log('Department added successfully!');
      startApp();
    });
  });
}

// Function to add a role
function addRole() {
  connection.query('SELECT * FROM department', (err, departments) => {
    if (err) throw err;

    inquirer.prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the title of the new role:'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the salary for the new role:'
      },
      {
        name: 'department_id',
        type: 'list',
        message: 'Select the department for the new role:',
        choices: departments.map(department => ({
          name: department.name,
          value: department.id
        }))
      }
    ]).then(answers => {
      connection.query('INSERT INTO role SET ?', answers, (err, res) => {
        if (err) throw err;
        console.log('Role added successfully!');
        startApp();
      });
    });
  });
}

// Function to add an employee
function addEmployee() {
  connection.query('SELECT * FROM role', (err, roles) => {
    if (err) throw err;

    connection.query('SELECT * FROM employee', (err, employees) => {
      if (err) throw err;

      inquirer.prompt([
        {
          name: 'first_name',
          type: 'input',
          message: 'Enter the first name of the new employee:'
        },
        {
          name: 'last_name',
          type: 'input',
          message: 'Enter the last name of the new employee:'
        },
        {
          name: 'role_id',
          type: 'list',
          message: 'Select the role for the new employee:',
          choices: roles.map(role => ({
            name: role.title,
            value: role.id
          }))
        },
        {
          name: 'manager_id',
          type: 'list',
          message: 'Select the manager for the new employee:',
          choices: [
            { name: 'None', value: null },
            ...employees.map(employee => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id
            }))
          ]
        }
      ]).then(answers => {
        connection.query('INSERT INTO employee SET ?', answers, (err, res) => {
          if (err) throw err;
          console.log('Employee added successfully!');
          startApp();
        });
      });
    });
  });
}

// Function to update an employee's role
function updateEmployeeRole() {
  connection.query('SELECT * FROM employee', (err, employees) => {
    if (err) throw err;

    connection.query('SELECT * FROM role', (err, roles) => {
      if (err) throw err;

      inquirer.prompt([
        {
          name: 'employee_id',
          type: 'list',
          message: 'Select the employee to update:',
          choices: employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
          }))
        },
        {
          name: 'role_id',
          type: 'list',
          message: 'Select the new role for the employee:',
          choices: roles.map(role => ({
            name: role.title,
            value: role.id
          }))
        }
      ]).then(answers => {
        connection.query('UPDATE employee SET ? WHERE ?', [{ role_id: answers.role_id }, { id: answers.employee_id }], (err, res) => {
          if (err) throw err;
          console.log('Employee role updated successfully!');
          startApp();
        });
      });
    });
  });
}

