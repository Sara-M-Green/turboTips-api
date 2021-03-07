const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const EmployeesService = require('../src/employees/employees-service')
const { makeEmployeeArray, makeEmpDeptArray, makeDeptArray } = require('./tips.fixtures')

describe('Employee endpoints', function() {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db.raw('TRUNCATE daily_tips, employee_department, employees RESTART IDENTITY CASCADE'))

    afterEach('clean up', () => db.raw('TRUNCATE daily_tips, employee_department, employees RESTART IDENTITY CASCADE'))

    describe(`GET api/employees`, () => {
        context('given there are employees in the db', () => {
            const testEmployees = makeEmployeeArray()

            beforeEach('insert employees', () => {
                return db
                    .into('employees')
                    .insert(testEmployees)
            })

            it('GET /api/employees responds with 200 and all of the employees', () => {
                return supertest(app)
                    .get('/api/employees')
                    .expect(200, testEmployees)
            }) 
        })

        context('Given there are no employees in db', () => {
            it('resolves an empty array', () => {
                return EmployeesService.getAllEmployees(db)
                    .then(actual => {
                        expect(actual).to.eql([])
                    })
            })
        })
    })

    describe('GET /api/employees/:dept_id', () => {
        context('Given no employees in db', () => {
            it(`responds with 404`, () => {
                const fakeDeptId = 99999
                return supertest(app)
                    .get(`/api/employees/${fakeDeptId}`)
                    .expect(404, { error: { message: 'No employees in that department' }})
            })
        })

        context('Given there are employees in the db', () => {
            const testEmployees = makeEmployeeArray()
            const testDepts = makeDeptArray()
            const testEmpDepts = makeEmpDeptArray()

            beforeEach('insert employees', () => {
                return db
                    .into('employees')
                    .insert(testEmployees)
                    .then(() => {
                        return db
                        .into('departments')
                        .insert(testDepts)
                    })
                    .then(() => {
                        return db
                        .into('employee_department')
                        .insert(testEmpDepts)
                    })
            })

            it('GET /api/employees/:dept_id responds with 200 and correct employee', () => {
                const dept_id = 3
                const expectedEmployees = testEmpDepts.filter(function(emps) {
                    return emps.dept_id === dept_id
                })
                return supertest(app)
                    .get(`/api/employees/${dept_id}`)
                    .expect(200, expectedEmployees)
            })
        })
    })    
})