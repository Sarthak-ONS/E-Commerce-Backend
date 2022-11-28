const express = require('express')
const { sign } = require('jsonwebtoken')

const router = express.Router()

const { signup, login, logout } = require('../controllers/userController')



router.route('/signup').post(signup)

router.route('/login').post(login)


router.route('/logout').get(logout)

// router.route('/logout')


module.exports = router