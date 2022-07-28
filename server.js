const { prompt } = require('inquirer');
const art = require('asciiart-logo');
require('console.table');
const database = require('./db');
const connection = require('./db/connection');
init();
//initializer
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
                    name: 'Add An Employee',
                    value: 'ADD_EMPLOYEE'
                },
                // {
                //     name: 'Update An Employee Role',
                //     value: 'UPDATE_EMPLOYEE_ROLE'
                // },
                // {
                //     name: 'Update An Employee Manager',
                //     value: 'UPDATE_EMPLOYEE_MANAGER'
                // },
                {
                    name: 'Remove An Employee',
                    value: 'REMOVE_EMPLOYEE'
                },
                // {
                //     name: 'Remove A Department',
                //     value: 'REMOVE_DEPARTMENT'
                // },
                // {
                //     name: 'Remove A Role',
                //     value: 'REMOVE_ROLE'
                // },
                // {
                //     name: 'View Total Budget Of Department',
                //     value: 'VIEW_TOTAL_BUDGET'
                // },
                {
                    name: 'Quit',
                    value: 'QUIT'
                }
            ]
        }
    ]).then(res => { // then function selector
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
                addNewRole();
                break;
            case 'ADD_EMPLOYEE':
                addEmployee();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                updateEmployeeRole();
                break;
            // case 'UPDATE_EMPLOYEE_MANAGER':
            //     updateEmployeeManager();
            //     break;
            case 'REMOVE_EMPLOYEE':
                removeEmployee();
                break;
            // case 'REMOVE_DEPARTMENT':
            //     removeDepartment();
            //     break;
            // case 'REMOVE_ROLE':
            //     removeRole();
            //     break;
            // case 'VIEW_TOTAL_BUDGET':
            //     viewTotalBudget();
            //     break;
            case 'QUIT':
                quit();
                break;
        }
    }
    )
}
// all of the functions...titles self explanitory
function viewDepartments() {
    database.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log('\n');
            console.table(departments);
        })
        .then(() => mainPrompts());
}

function viewRoles() {
    database.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log('\n');
            console.table(roles);
        })
        .then(() => mainPrompts());
}

function viewEmployees() {
    database.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log('\n');
            console.table(employees);
        })
        .then(() => mainPrompts());
}

function viewEmployeesDepartments() {
    database.findEmployeesByDept()
        .then(([rows]) => {
            let employeesDept = rows;
            console.log('\n');
            console.table(employeesDept);
        })
        .then(() => mainPrompts());
}

function viewEmployeesManager() {
    database.findEmployeesMngr()
        .then(([rows]) => {
            let employeesMngr = rows;
            console.log('\n');
            console.table(employeesMngr);
        })
        .then(() => mainPrompts());
}

function addDepartment() {
    prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What department would you like to add?'
        }
    ]).then((answer) => {
        database.addDept(answer.department)
    }).then(() => mainPrompts());
}

function addNewRole() {
    database.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            var deptChoices = departments.map(({ Department, ID }) => ({
                name: Department,
                value: ID
            }))
            // return deptChoices;
            prompt([
                {
                    type: 'input',
                    name: 'role',
                    message: 'What role do you want to add?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary for this role?'
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'In what department is this role?',
                    choices: deptChoices
                }
            ]).then((answers) => {
                database.addRole(answers)
                    .then(() => mainPrompts())
            })
        })
}

function addEmployee() {
    database.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleChoice = roles.map(({ Title, ID }) => ({
                name: Title,
                value: ID
            }))
            prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Please enter the employees first name.'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Please enter the employees last name.'
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Enter the employees role.',
                    choices: roleChoice
                }
            ]).then((answers) => {
                database.addNewEmpl(answers)
                    .then(() => chooseManager())
            })
        })
}
function chooseManager() {
    database.findEmployeesMngr()
        .then(([rows]) => {
            let employeesMngr = rows;
            const managers = employeesMngr.map
                (({ Manager }) => ({
                    name: Manager
                }))

            prompt([
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Enter the employees manager.',
                    choices: managers
                }
            ]).then(() => mainPrompts())
        })
}

// function updateEmployeeRole() {
//     database.findAllRoles()
//         .then(([rows]) => {
//             let roles = rows;
//             const roleChoice = roles.map(({ Title, ID }) => ({
//                 name: Title,
//                 value: ID
//             }))
//             database.findAllEmployees().then(([rows]) => {
//                 let employees = rows;
//                 console.log(employees);
//                 const employeeChoice = employees.map(({ First_Name, Last_Name, Title, ID }) => ({
//                     name: First_Name,
//                     name: Last_Name,
//                     name: Title,
//                     value: ID
//                 }))


//                 prompt([
//                     {
//                         type: 'list',
//                         name: 'name',
//                         message: 'What employee will have their role updated?',
//                         choices: employeeChoice
//                     },
//                     {
//                         type: 'list',
//                         name: 'role',
//                         message: 'What new role will employee have?',
//                         choices: roleChoice
//                     }
//                 ]).then((answers) => {
//                     database.employeeRoleUpdate(answers)
//                         .then(() => mainPrompts())
//                 })
//             })
//         })
// }

function removeEmployee() {
    database.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log(employees);
            const employeeChoice = employees.map(({ First_Name, Last_Name, ID }) => ({
                name: First_Name,
                name: Last_Name,
                value: ID
            }))
            prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Which employee would you like to remove?',
                    choices: employeeChoice
                }
            ]).then((answers) => {
                database.removeEmpl(answers)
                    .then(() => mainPrompts())
            })
        })
}

// function removeRole() {
//     database.findAllRoles()
//         .then(([rows]) => {
//             let roles = rows;
//             console.log(roles);
//             const roleChoice = roles.map(({ Title, ID }) => ({
//                 name: Title,
//                 value: ID
//             }))
//             prompt([
//                 {
//                     type: 'list',
//                     name: 'role',
//                     message: 'Which role would you like to remove?',
//                     choices: roleChoice
//                 }
//             ]).then((answers) => {
//                 database.removeRole(answers)
//                     .then(() => mainPrompts())
//             })
//         })
// }


//quit function with ascii art
function quit() {
    const artText = art({ name: 'Thank You!' }).render();

    console.log(artText);
    process.exit();
};