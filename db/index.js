const connection = require('./connection');
const util = require('util');
class Database {
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        //Instructor Provided
        const queryString = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS magager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
        return this.connection.promise().query(
            queryString)

    };


};

module.exports = Database;