const express = require('express')
const { sign } = require('jsonwebtoken')

const router = express.Router()

const { signup,
    login,
    logout,
    forgotPassword,
    passwordReset,
    getLoggedInUserDetails,
    changePassword,
    updateUserDetails,
    adminAllUser,
    managerAllUsers,

} = require('../controllers/userController')

const { isLoggedIn,
    customRole,
    admingetOneUser,
} = require('../middlewares/user-middleware')


router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/forgotPassword').post(forgotPassword)
router.route('/password/reset/:token').post(passwordReset)
router.route('/userDashboard').get(isLoggedIn, getLoggedInUserDetails)
router.route('/password/update').post(isLoggedIn, changePassword)
router.route('/userDashboard/update').post(isLoggedIn, updateUserDetails)

// Admin only routes
router.route('/admin/getAllUsers').get(isLoggedIn, customRole('user'), adminAllUser)

router.route('/admin/user/:id').get(isLoggedIn, customRole('admin'), admingetOneUser)


// Just fun, managers only routes
router.route('/manager/getAllUsers').get(isLoggedIn, customRole('manager'), managerAllUsers)




module.exports = router