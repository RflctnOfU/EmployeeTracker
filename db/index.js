const connection = require('./connection');
class Database {
    constructor(connection) {
        this.connection = connection;
    }
    //methods for the Database Class
    findAllDepartments() {
        return this.connection.promise().query("SELECT department.name AS Department, department.id AS ID FROM department;");
    }

    findAllRoles() {
        return this.connection.promise().query("SELECT role.title AS Title, role.id AS ID, department.name AS Department, role.salary AS Salary FROM role LEFT JOIN department ON role.department_id = department.id;");
    }

    findAllEmployees() {
        //Instructor Provided
        return this.connection.promise().query(
            "SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Magager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;")
    }

    findEmployeesByDept() {
        return this.connection.promise().query("SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS Employee, role.title AS Role, department.name AS Department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;");
    }

    findEmployeesMngr() {
        return this.connection.promise().query("SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS Employee,CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employee INNER JOIN employee manager ON employee.manager_id = manager.id")
    }

    addDept(answer) {
        return this.connection.promise().query(`INSERT INTO department (name) VALUES ('${answer}')`)
    }

    addRole(answer) {
        return this.connection.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.role}', ${answer.salary}, ${answer.department})`)
    }

    addNewEmpl(answer) {
        return this.connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.role})`)
    }

    // addEmplMngr(answer) {
    //     return this.connection.promise().query(`UPDATE employee SET manager_id = ${answer.manager} [WHERE manager_id = ''`)
    // }

    employeeRoleUpdate() {
        return this.connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.role})`)
    }

    removeEmpl(answer) {
        return this.connection.promise().query(`DELETE FROM employee WHERE employee.id = ${answer.employee}`)
    }

    removeRole(roleID) {
        return this.connection.promise().query(`DELETE FROM role WHERE role.id`, roleID)
    }

};

module.exports = new Database(connection);