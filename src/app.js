require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const types = require('pg').types
const TipsService = require('./tips/tips-service')
const tipsRouter = require('./tips/tips-router')

const app = express()
const jsonParser = express.json()

const morganOption = (NODE_ENV === 'production') 
    ? 'tiny' 
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

types.setTypeParser(1700, 'text', parseFloat);

function processTips(rows){
    rows.forEach((row)=> {
        row.tips = parseFloat(row.tips)
    })
    return rows
}

app.use('/tips', tipsRouter)

// app.get('/tips', (req, res, next) => {
//     const knexInstance = req.app.get('db')
//     TipsService.getAllTips(knexInstance)
//         .then(tips => {
//             res.json(tips)
//         })
//         .catch(next)
// })

// app.post('/tips', jsonParser, (req, res, next) => {
//     const { tip_date, emp_id, bottles, tips } = req.body
//     const newTipObject = { tip_date, emp_id, bottles, tips }
//     TipsService.addDailyTips(
//         req.app.get('db'),
//         newTipObject
//     )
//         .then(tipObject => {
//             res
//                 .status(201)
//                 .location(`/tips/${tipObject.tip_date}`)
//                 .json(tipObject)
//         })
//         .catch(next)
// })

// app.get('/tips/:date', (req, res, next) => {
//     const knexInstance = req.app.get('db')
//     TipsService.getByDate(knexInstance, req.params.date)
//         .then(tips => {
//             if(tips.length < 1) {
//                 return res.status(404).json({
//                     error: { message: `No tips for that date found`}
//                 })
//             }
//             res.json(tips)
//         })
//         .catch(next)
// })

app.get('/', (req, res) => {
    res.send('Hello, turboTips!')
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if(NODE_ENV === 'production') {
        response = { error: { message: 'server error' }}
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app
