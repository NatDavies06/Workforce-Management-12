const pool = require('./connection');

// Function to get all departments
async function getAllDepartments() {
    const [row, fields] = await pool.query('SELECT * FROM department');
    return rows;
}

// Function to get all role
async function getAllDepartments() {
    const [row, fields] = await pool.query('SELECT * FROM role');
    return rows;
}

// Function to get all employees
async function getAllDepartments() {
    const [row, fields] = await pool.query('SELECT * FROM employee');
    return rows;
}

// Function to add a department
async function addDepartment(name) {
    const [result, fields] = await pool.query('INSERT INTO department (name) VALUES (?)', [name]);
    return result.insertId;
}

// Function to add a role
async function addRole(title, salary, departmentId) {
    const [result, fields] = await pool.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
    return result.insertId;
}

// Function to add employee
async function addEmployee(firstName, lastName, roleId, managerId) {
    const [result, fields] = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
    return result.insertId;
}

module.exports = { getAllDepartments, getAllRoles, getAllEmployees, addDepartment, addRole, addEmployee };