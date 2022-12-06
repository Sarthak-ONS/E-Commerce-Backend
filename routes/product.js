const express = require('express')
const { addProduct, getAllProducts } = require('../controllers/product-Controller')
const router = express.Router()
const { isLoggedIn, customRole } = require('../middlewares/user-middleware')



router.route('/products').get(getAllProducts)


// Admin Routes
router.route('/admin/product/add').post(isLoggedIn, customRole('admin'), addProduct)

module.exports = router 
