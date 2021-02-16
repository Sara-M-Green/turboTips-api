const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')

describe.only(`Tips Endpoints`, function() {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('daily_tips').truncate())

    context('Given there are daily_tips in the db', () => {
        const testTips = [
            {
                date: '2020-02-01',
                emp_id: 1,
                bottles: 5,
                tips: 123.45
            },
            {
                date: '2020-02-01',
                emp_id: 2,
                bottles: 2,
                tips: 56.78
            },
            {
                date: '2020-02-02',
                emp_id: 2,
                bottles: 6,
                tips: 89.98
            },
            {
                date: '2020-02-02',
                emp_id: 3,
                bottles: 0,
                tips: 159.95
            },
        ];

        beforeEach('insert tips', () => {
            return db
                .into('daily_tips')
                .insert(testTips)
        })

        it('GET /tips responds with 200 and all of the daily tips', () => {
            return supertest(app)
                .get('/tips')
                .expect(200, testTips)
        })
    })
  })