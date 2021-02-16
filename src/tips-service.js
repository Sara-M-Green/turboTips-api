const TipsService = {
    getAllTips(db) {
        return db('daily_tips')
            .select('*');
    }
}

module.exports = TipsService