const DepartmentsService = {
    getAllDepartments(knex) {
        return knex.select('*').from('departments')
    },
    getById(knex, id) {
        return knex
            .from('departments')
            .select('*')
            .where('dept_id', id)
            .first()
    },
}    

module.exports = DepartmentsService