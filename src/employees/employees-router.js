const express = require('express')
const xss = require('xss')
const EmployeesService = require('./employees-service')
const employeesRouter = express.Router()

employeesRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        EmployeesService.getAllEmployees(knexInstance)
            .then(employees => {
                res.json(employees.map(serializeEmployee))
            })
            .catch(next)
    })

employeesRouter
    .route('/:dept')
    .all((req, res, next) => {
        EmployeesService.getByDepartment(
            req.app.get('db'),
            req.params.dept
        )
            .then(dept => {
                if (dept.length === 0) {
                    return res.status(404).json({
                        error: { message: 'No employees in that department' }
                    })
                }
                res.dept = dept
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(res.dept)
    })


module.exports = employeesRouter
