const connection = require('./connection');
class Database {
    constructor(connection) {
        this.connection = connection;
    }

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

    addDept(answer) {
        return this.connection.promise().query(`INSERT INTO department (name) VALUES ('${answer}')`)
    }

    addRole(answer) {
        return this.connection.promise().query(``)
    }

};

module.exports = new Database(connection);