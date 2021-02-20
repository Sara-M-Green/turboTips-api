--CREATE employee_department table with foreign keys from departments and employees
CREATE TABLE employee_department (
    emp_id INTEGER REFERENCES employees(emp_id),
    dept_id INTEGER REFERENCES departments(dept_id),
    PRIMARY KEY (emp_id, dept_id)
);