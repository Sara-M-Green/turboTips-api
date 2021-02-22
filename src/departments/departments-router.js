const express = require('express')
const DepartmentsService = require('./departments-service')

const departmentsRouter = express.Router()


departmentsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        DepartmentsService.getAllDepartments(knexInstance)
            .then(departments => {
                res.json(departments)
            })
            .catch(next)
    })

departmentsRouter
    .route('/:dept_id')
    .all((req, res, next) => {
        DepartmentsService.getById(
            req.app.get('db'),
            req.params.dept_id
        )
            .then(department => {
                if (!department) {
                    return res.status(404).json({
                        error: { message: 'Department with that id does not exist' }
                    })
                }
                res.department = department
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(res.department)
    })

module.exports = departmentsRouter