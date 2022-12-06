const express = require('express')
const { addProduct } = require('../controllers/product-Controller')
const router = express.Router()
const { isLoggedIn, customRole } = require('../middlewares/user-middleware')


router.route('/addProduct').post(addProduct)



module.exports = router 
