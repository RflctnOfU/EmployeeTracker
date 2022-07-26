const { prompt } = require('inquirer');
const art = require('asciiart-logo');
require('console.table');
const database = require('./db');
const { inherits } = require('util');
const dataBase = new database;

init();

function init() {
    const artText = art({ name: 'Employee Manager ' }).render();

    console.log(artText);

    mainPrompts();
}

function mainPrompts() {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'View All Employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'View All Employees By Department',
                    value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
                },
                {
                    name: 'View All Employees By Manager',
                    value: 'VIEW_EMPLOYEES_BY_MANAGER'
                },
                {
                    name: 'Add A Department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Add A Role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Update An Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                },
                {
                    name: 'Update An Employee Manager',
                    value: 'UPDATE_EMPLOYEE_MANAGER'
                },
                {
                    name: 'Add An Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Remove An Employee',
                    value: 'REMOVE_EMPLOYEE'
                },
                {
                    name: 'Remove A Department',
                    value: 'REMOVE_DEPARTMENT'
                },
                {
                    name: 'Remove A Role',
                    value: 'REMOVE_ROLE'
                },
                {
                    name: 'View Total Budget Of Department',
                    value: 'VIEW_TOTAL_BUDGET'
                },
                {
                    name: 'Quit',
                    value: 'QUIT'
                }
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        switch (choice) {
            case 'VIEW_DEPARTMENTS':
                viewDepartments();
                break;
            case 'VIEW_ROLES':
                viewRoles();
                break;
            case 'VIEW_EMPLOYEES':
                viewEmployees();
                break;
            case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
                viewEmployeesDepartments();
                break;
            case 'VIEW_EMPLOYEES_BY_MANAGER':
                viewEmployeesManager();
                break;
            case 'ADD_DEPARTMENT':
                addDepartment();
                break;
            case 'ADD_ROLE':
                addRole();
                break;
            case 'ADD_EMPLOYEE':
                addEmployee();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                updateEmployeeRole();
                break;
            case 'UPDATE_EMPLOYEE_MANAGER':
                updateEmployeeManager();
                break;
            case 'REMOVE_EMPLOYEE':
                removeEmployee();
                break;
            case 'REMOVE_DEPARTMENT':
                removeDepartment();
                break;
            case 'REMOVE_ROLE':
                removeRole();
                break;
            case 'VIEW_TOTAL_BUDGET':
                viewTotalBudget();
                break;
            case 'QUIT':
                quit();
                break;
        }
    }
    )
}

function viewDepartments() {

}

function viewRoles() {

}

function viewEmployees() {
    dataBase.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log('\n');
            console.table(employees);
        })
        .then(() => mainPrompts());
}