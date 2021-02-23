const path = require('path')
const express = require('express')
const e = require('cors')
const employeesRouter = require('../employees/employees-router')
const EmployeesService = require('../employees/employees-service')
const employeeDepartmentService = require('./employeeDepartment-service')
const { json } = require('express')

const employeeDepartmentRouter = express.Router()
const jsonParser = express.json()

employeeDepartmentRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        employeeDepartmentService.getAll(knexInstance)
            .then(all => {
                res.json(all)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { emp_id, dept_id } = req.body
        const newEmpDept = { emp_id, dept_id }

        for (const [key, value] of Object.entries(newEmpDept))
            if (value == null)
            return res.status(400).json({
                error: { message: `Missing '${key}' in request body` }
            })
        
            employeeDepartmentService.addEmpDept(
                req.app.get('db'),
                newEmpDept
            )
                .then(employee => {
                    res
                        .status(201)
                        .location(path.posix.join(req.originalUrl, `/${employee.emp_id}`))
                        .json(employee)
                })
                .catch(next)
    })

employeeDepartmentRouter
    .route('/:emp_id')
    .all((req, res, next) => {
        employeeDepartmentService.getByEmployeeId(
          req.app.get('db'),
          req.params.emp_id
        )
        .then(employee => {
            if (!employee) {
                return res.status(404).json({
                    error: { message: `Employee with that ID does not exist` }
                })
            }
            res.employee = employee
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(res.employee)
    })
    // .patch(jsonParser, (req, res, next) => {
    //     const { emp_id, dept_id } = req.body
    //     cosnt empDeptToUpdate = { dept_id }

    //     if (!dept_id) {
    //         return res.status(400).json({
    //             error: {
    //                 message: 'Request body must contain new department ID'
    //             }
    //         })
    //     }

    //     employeeDepartmentService.updateEmpDept(
    //         req.app.get('db'),
    //         req.params.emp_id,
    //         req.params.dept_id,
    //         empDeptToUpdate
    //     )
    //         .then(numRowsAffected => {
    //             res.status(204).end()
    //         })
    //         .catch(next)
    // })


module.exports = employeeDepartmentRouter