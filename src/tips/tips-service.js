const TipsService = {
    getAllTips(knex) {
        return knex.select('*').from('daily_tips')
    },
    getByDate(knex, date) {
        return knex.from('daily_tips').select('*').where('tip_date', date)
    },
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