const express = require('express')
require('dotenv').config({})
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')


// for Swagger Documentation

const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load("./swagger.yaml")
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))




// regular Middelwares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Cookies and File Middlewares
app.use(cookieParser())
app.use(fileUpload())


app.use(morgan('tiny'))


// We nedd just routes only.

const home = require('./routes/home')




// router middlewares
app.use('/api/v1', home)



module.exports = app;