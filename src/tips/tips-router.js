const express = require('express')
const TipsService = require('./tips-service')
const path = require('path')

const tipsRouter = express.Router()
const jsonParser = express.json()

const types = require('pg').types
types.setTypeParser(1700, 'text', parseFloat);

tipsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        TipsService.getAllTips(knexInstance)
            .then(tips => {
                res.json(tips)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        console.log("hello!")
        const { tip_date, emp_id, bottles, tips } = req.body
        const newTipObject = { tip_date, emp_id, tips }

        for (const [key, value] of Object.entries(newTipObject)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body`}
                })
            }
        }

        newTipObject.bottles = bottles
        TipsService.addDailyTips(
            req.app.get('db'),
            newTipObject
        )
            .then(tipObject => {
                console.log(tipObject)
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${newTipObject.tip_date}`))
                    .json(tipObject)
            })
            .catch(next)
    })

tipsRouter
    .route('/:date')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        TipsService.getByDate(knexInstance, req.params.date)
            .then(tips => {
                if(tips.length < 1) {
                    return res.status(404).json({
                        error: { message: `No tips for that date found`}
                    })
                }
                res.json(tips)
            })
            .catch(next)
    })
    

module.exports = tipsRouter