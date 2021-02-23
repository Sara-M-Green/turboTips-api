const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const EmployeesService = require('../src/employees/employees-service')
const { makeEmployeeArray } = require('./tips.fixtures')

describe.only('Employee endpoints', function() {
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

            it('addEmployee adds a new employee and resolves the new employee', () => {
                const newEmployee = {
                    emp_id: 1,
                    emp_name: "New Guy"
                }

                return EmployeesService.addEmployee(db, newEmployee)
                    .then(actual => {
                        expect(actual).to.eql(newEmployee)
                    })
            })
        })
    })

    describe('GET /api/employees/:emp_id', () => {
        context('Given no employees in db', () => {
            it(`responds with 404`, () => {
                const fakeEmpId = 99999
                return supertest(app)
                    .get(`/api/employees/${fakeEmpId}`)
                    .expect(404, { error: { message: 'Employee with that id does not exist' }})
            })
        })

        context('Given there are employees in the db', () => {
            const testEmployees = makeEmployeeArray()

            beforeEach('insert employees', () => {
                return db
                    .into('employees')
                    .insert(testEmployees)
            })

            it('GET /api/employees/:emp_id responds with 200 and correct employee', () => {
                const emp_id = 3
                const expectedEmployee = testEmployees[emp_id - 1]
                return supertest(app)
                    .get(`/api/employees/${emp_id}`)
                    .expect(200, expectedEmployee)
            })
        })
    })

    describe('POST /api/employees', () => {
        it('creates a new employee', () => {
            const newEmployee = {
                emp_id: 1,
                emp_name: 'New Guy'
            }

            return supertest(app)
                .post('/api/employees')
                .send(newEmployee)
                .expect(201)
                .expect(res => {
                    expect(res.body.emp_id).to.eql(newEmployee.emp_id)
                    expect(res.body.emp_name).to.eql(newEmployee.emp_name)
                    expect(res.headers.location).to.eql(`/api/employees/${res.body.emp_id}`)
                })
                .then(postRes => {
                    supertest(app)
                        .get(`/api/employees/${postRes.body.emp_id}`)
                        .expect(postRes.body)
                })
        })

        it('Responds with 400 and error message when emp_name is missing', () => {
            const newEmployee = {
                emp_id: 1
            }

            return supertest(app)
                .post('/api/employees')
                .send(newEmployee)
                .expect(400, {
                    error: { message: 'Employee name required' }
                })
        })

    })

    describe(`DELETE /employees/:emp_id`, () => {
        context('Given there are no employees in db', () => {
            it('responds with 404', () => {
                const emp_id = 9999
                return supertest(app)
                    .delete(`/api/employees/${emp_id}`)
                    .expect(404, { error: { message: 'Employee with that id does not exist' } })
            })
        })


        context('Given there are employees in the database', () => {
            const testEmployees = makeEmployeeArray()

            beforeEach('insert employees', () => {
                return db
                    .into('employees')
                    .insert(testEmployees)
            })

            it('responds with 204 and removes the tip object', () => {
                const idToRemove = 3
                expectedEmployees = testEmployees.filter(emp => emp.emp_id !== idToRemove)

                return supertest(app)
                    .delete(`/api/employees/${idToRemove}`)
                    .expect(204)
                    .then(res => 
                        supertest(app)
                        .get(`/api/employees`)
                        .expect(expectedEmployees)    
                    )
            })
        })
    })
})