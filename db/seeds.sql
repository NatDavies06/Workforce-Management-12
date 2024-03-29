-- Seed data for employee tracker database
-- Insert departments
INSERT INTO
    department (name)
VALUES
    ('Engineering'),
    ('Finances'),
    ('Human Resources');

-- Insert roles
INSERT INTO
    role (title, salary, department_id)
VALUES
    ('Software Engineer', 80000, 1),
    ('Financial Analyst', 65000, 2),
    ('HR Manager', 75000, 3);

-- Insert employees
INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 3);
    ('Nate', 'Davis', 3, 1);