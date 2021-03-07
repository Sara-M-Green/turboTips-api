const employeeDepartmentService = {
    getAll(knex) {
        return knex('employee_department')
            .join('departments', 'employee_department.dept_id', '=', 'departments.dept_id')
            .join('employees', 'employee_department.emp_id', '=', 'employees.emp_id')
            .select('employees.emp_name', 'departments.dept_name')
    },
    addEmpDept(knex, newEmpDept) {
        return knex
            .insert(newEmpDept)
            .into('employee_department')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getByEmployeeId(knex, emp_id) {
        return knex
            .from('employee_department')
            .select('*')
            .where('emp_id', emp_id)
    },
    // deleteEmpDept(knex, emp_id, dept_id) {
    //     return knex('employee_department')
    //         .where({ emp_id })
    //         .andWhere({ dept_id })
    //         .delete()
    // },
    updateEmpDept(knex, emp_id, dept_id, newDept_id) {
        return knex('employee_department')
        .where({ emp_id })
        .andWhere({ dept_id })
        .update(newDept_id)
    }
}

module.exports = employeeDepartmentService