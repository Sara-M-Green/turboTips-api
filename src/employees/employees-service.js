const EmployeesService = {
    getAllEmployees(knex) {
        return knex('employees')
            .select('*')
    },
    getByDepartment(knex, dept) {
        return knex('employee_department')
            .join('departments', 'employee_department.dept_id', '=', 'departments.dept_id')
            .join('employees', 'employee_department.emp_id', '=', 'employees.emp_id')
            .select('employees.emp_name', 'employees.emp_id', 'departments.dept_name')
            .where('employee_department.dept_id', dept)
    },
}    

module.exports = EmployeesService