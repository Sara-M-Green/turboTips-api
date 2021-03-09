require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const types = require('pg').types
const tipsRouter = require('./tips/tips-router')
const employeesRouter = require('./employees/employees-router')
const departmentsRouter = require('./departments/departments-router')
const employeeDepartmentRouter = require('./employeeDepartment/employeeDepartments-router')

const app = express()

const morganOption = (NODE_ENV === 'production') 
    ? 'tiny' 
    : 'common';

app.use(cors())
app.options('*', cors())
app.use(morgan(morganOption))
app.use(helmet())


types.setTypeParser(1700, 'text', parseFloat);


app.use('/api/tips', tipsRouter)
app.use('/api/employees', employeesRouter)
app.use('/api/departments', departmentsRouter)
app.use('/api/employee-departments', employeeDepartmentRouter)

app.get('/api', (req, res) => {
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
