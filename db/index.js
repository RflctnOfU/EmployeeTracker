const connection = require('./connection');
class Database {
    constructor(connection) {
        this.connection = connection;
    }

    findAllDepartments() {
        return this.connection.promise().query("SELECT department.name, department.id FROM department;");
    }

    findAllRoles() {
        return this.connection.promise().query("SELECT role.title, role.id, department.name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;");
    }

    findAllEmployees() {
        //Instructor Provided
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS magager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;")
    }

    findEmployeesByDept() {
        return this.connection.promise().query("SELECT role.title, role.id, department.name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;");
    }


};

module.exports = new Database(connection);