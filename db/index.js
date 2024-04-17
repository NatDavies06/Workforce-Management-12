const connection = require("./connection");

class DB {
    constructor(connection){
        this.connection = connection;
    }

    // Create a employee
    createEmp(employee){
        return this.connection
        .promise()
        .query(
            "INSERT INTO employee SET ?", employee
        );
    }
    // Create a role
    createRole(role){
        return this.connection
        .promise()
        .query(
            "INSERT INTO role SET ?", role
        );
    }
    // Create a department
    createDept(department){
        return this.connection
        .promise()
        .query(
            "INSERT INTO department SET ?", department
        );
    }
    findAllEmp(){
        return this.connection
        .promise()
        .query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }
    findAllRoles(){
        return this.connection
        .promise()
        .query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }
    findAllDept(){
        return this.connection
        .promise()
        .query(
            "SELECT department.id, department.name FROM department;"
        );
    }

    findAllMngr(employeeId) {
        return this.connection
        .promise()
        .query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );
    }

    // Update the table
    updateEmpRole(employeeId, roleId) {
        return this.connection
        .promise()
        .query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }
}

module.exports = new DB(connection);