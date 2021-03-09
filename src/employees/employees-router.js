const path = require('path')
const express = require('express')
const xss = require('xss')
const EmployeesService = require('./employees-service')

const employeesRouter = express.Router()
const jsonParser = express.json()

const serializeEmployee = employee => ({
     emp_id: employee.emp_id,
     emp_name: xss(employee.emp_name)
})

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
    // .post(jsonParser, (req, res, next) => {
    //     const { emp_name, emp_id } = req.body
    //     const newEmployee = { emp_name, emp_id }

    //     if (!emp_name) {
    //         return res.status(400).json({
    //             error: { message: 'Employee name required' }
    //         })
    //     }

    //     newEmployee.emp_name = emp_name;

    //     EmployeesService.addEmployee(
    //         req.app.get('db'),
    //         newEmployee
    //     )
    //         .then(employee => {
    //             res
    //                 .status(201)
    //                 .location(path.posix.join(req.originalUrl, `/${employee.emp_id}`))
    //                 .json(serializeEmployee(employee))
    //         })
    //         .catch(next)
    // })

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
    // .delete((req, res, next) => {
    //     EmployeesService.deleteEmployee(
    //         req.app.get('db'),
    //         req.params.emp_id
    //     )
    //         .then(numRowsAffected => {
    //             res.status(204).end()
    //         })
    //         .catch(next)
    // })

module.exports = employeesRouter
