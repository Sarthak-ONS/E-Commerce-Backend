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
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/"
}))


//temp check only
app.set('view engine', 'ejs')


//morgan middleware
app.use(morgan('tiny'))


// We nedd just routes only.

const home = require('./routes/home')

const user = require('./routes/user')


// router middlewares
app.use('/api/v1', home)
app.use('/api/v1', user)



app.get('/signuptest', (req, res) => {
    res.render('signuptest')
})


// exports app.js
module.exports = app;