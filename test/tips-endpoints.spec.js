const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const TipsService = require('../src/tips/tips-service')
const { makeTipsArray, makeEmployeeArray } = require('./tips.fixtures')
const types = require('pg').types

types.setTypeParser(1700, 'text', parseFloat);

describe(`Tips Endpoints`, function() {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('daily_tips').truncate())

    afterEach('cleanup', () => db('daily_tips').truncate())

    describe(`GET /api/tips`, () => {
        context('Given there are daily_tips in the db', () => {
            const testTips = makeTipsArray()
            const testEmployees = makeEmployeeArray()

            beforeEach('insert tips', () => {
                return db
                    .into('employees')
                    .insert(testEmployees)
                    .then(() => {
                        return db
                        .into('daily_tips')
                        .insert(testTips)
                    })
            })

            it('GET /api/tips responds with 200 and all of the daily tips', () => {
                return supertest(app)
                    .get('/api/tips')
                    .expect(200, testTips)
            })    
        })

        context(`Give there are no tips in the db`, () => {
            it(`resolves an empty array`, () => {
                return TipsService.getAllTips(db)
                    .then(actual => {
                        expect(actual).to.eql([])
                    })
            })

            it(`addDailyTips() adds a new daily_tips object and resolves the new daily tip`, () => {
                const newTips = {
                    tip_date: 20200203,
                    emp_id: 4,
                    bottles: 4,
                    tips: 44.44
                }
                return TipsService.addDailyTips(db, newTips)
                    .then(actual => {
                        expect(actual).to.eql(newTips)
                    })
            })
        })
    })


    describe(`GET /api/tips/:date`, () => {
        context(`Given no tips in db`, () => {
            it(`responds with 404`, () => {
                const date = 17770704
                return supertest(app)
                    .get(`/api/tips/${date}`)
                    .expect(404, { error: { message: `No tips for that date found`}})
            })
        })

        context(`Given there are tips in the db`, () => {
            const testTips = makeTipsArray()

            beforeEach('insert tips', () => {
                return db
                    .into('daily_tips')
                    .insert(testTips)
            })

            it('GET /api/tips/:date responds with 200 and tips for specified date', () => {
                const date = 20200201
                const expectedTips = testTips.filter(function(tips) {
                    return tips.tip_date === date
                })
                return supertest(app)
                    .get(`/api/tips/${date}`)
                    .expect(200, expectedTips)
            })
        })
    })  

    describe(`POST /api/tips`, () => {
        it('creates a tip object responding with 201 and that object', function() {
            const newTipObject = {
                tip_date: 11111111,
                emp_id: 1,
                bottles: 1,
                tips: 111.11
            }

            return supertest(app)
                .post('/api/tips')
                .send(newTipObject)
                .expect(201)
                .expect(res => {
                    expect(res.body.tip_date).to.eql(newTipObject.tip_date)
                    expect(res.body.emp_id).to.eql(newTipObject.emp_id)
                    expect(res.body.bottles).to.eql(newTipObject.bottles)
                    expect(res.body.tips).to.eql(newTipObject.tips)
                    expect(res.headers.location).to.eql(`/api/tips/${res.body.tip_date}`)
                })
                .then(postRes =>
                    supertest(app)
                        .get(`/api/tips/${postRes.body.tip_date}`)
                        .expect([postRes.body])
                )
        })

        const requiredFields = ['tip_date', 'emp_id', 'tips']

        requiredFields.forEach(field => {
            const newTipObject = {
                tip_date: 22220202,
                emp_id: 2,
                tips: 123.23
            }

            it(`responds with 400 and an error message when the ${field} is missing`, () => {
                delete newTipObject[field]

                return supertest(app)
                    .post('/api/tips')
                    .send(newTipObject)
                    .expect(400, {
                        error: { message: `Missing '${field}' in request body`}
                    })
            })
        })
    })

    // describe.only(`DELETE /tips/:date`, () => {
    //     context('Given there are tips in the database', () => {
    //         cost testTips = makeTipsArray()

    //         beforeEach('insert tips', () => {
    //             return db
    //                 .into('daily_tips')
    //                 .insert(testTips)
    //         })

    //         it('responds with 204 and removes the tip object', () => {
                
    //         })
    //     })
    // })
    
    
})