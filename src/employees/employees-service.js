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

    // addEmployee(knex, newEmployee) {
    //     return knex
    //         .insert(newEmployee)
    //         .into('employees')
    //         .returning('*')
    //         .then(rows => {
    //             return rows[0]
    //         })
    // },
    
    // deleteEmployee(knex, id) {
    //     return knex('employees')
    //         .where('emp_id', id)
    //         .delete()
    // },
}    

module.exports = EmployeesService