const express = require('express')
const { sign } = require('jsonwebtoken')

const router = express.Router()

const { signup } = require('../controllers/userController')



router.route('/signup').post(signup)


module.exports = router