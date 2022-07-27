INSERT INTO department (name)
VALUES ('Sales'), 
('Engineering'), 
('Finance'), 
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1), 
('Salesperson', 80000, 1), 
('Lead Engineer', 150000, 2), 
('Software Engineer', 120000, 2), 
('Account Manager', 160000, 3), 
('Accountant', 125000, 3), 
('Legal Team Lead', 250000, 4), 
('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kimberly', 'Zahn', 1, NULL), 
('Jeremy', 'Short', 2, 1), 
('James', 'Jefferies', 3, NULL), 
('Erica', 'Stringer', 4, 3), 
('Alan', 'Ingrahm', 5, NULL), 
('Cynthia', 'Kramer', 6, 5), 
('Jeff', 'Granz', 7, NULL), 
('Carl', 'Silhorn', 8, 7);