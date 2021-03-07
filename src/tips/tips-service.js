const TipsService = {
    getAllTips(knex) {
        return knex('daily_tips')
        .join('employees', 'daily_tips.emp_id', '=', 'employees.emp_id' )
        .select('daily_tips.tip_date', 'employees.emp_name', 'daily_tips.bottles', 'daily_tips.tips')
    },
    // getByDate(knex, date) {
    //     return knex.from('daily_tips').select('*').where('tip_date', date)
    // },
    addDailyTips(knex, newTips){
        return knex
            .insert(newTips)
            .into('daily_tips')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

}

module.exports = TipsService