const EmployeesService = {
    getAllEmployees(knex) {
        return knex.select('*').from('employees')
    },
    addEmployee(knex, newEmployee) {
        return knex
            .insert(newEmployee)
            .into('employees')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex
            .from('employees')
            .select('*')
            .where('emp_id', id)
            .first()
    },
    deleteEmployee(knex, id) {
        return knex('employees')
            .where('emp_id', id)
            .delete()
    },
}    

module.exports = EmployeesService