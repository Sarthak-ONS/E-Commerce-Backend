const express = require('express')
const { sign } = require('jsonwebtoken')

const router = express.Router()

const { signup,
    login,
    logout,
    forgotPassword,
    passwordReset,
    getLoggedInUserDetails,
    changePassword
} = require('../controllers/userController')

const { isLoggedIn } = require('../middlewares/user-middleware')


router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/forgotPassword').post(forgotPassword)
router.route('/password/reset/:token').post(passwordReset)
router.route('/userDashboard').get(isLoggedIn, getLoggedInUserDetails)
router.route('/password/update').post(isLoggedIn, changePassword)


module.exports = router