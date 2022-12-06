const express = require('express')
const { addProduct, getAllProducts, adminGetAllProducts, getOneProduct, adminUpdateOneProduct, adminDeleteOneProduct } = require('../controllers/product-Controller')
const router = express.Router()
const { isLoggedIn, customRole } = require('../middlewares/user-middleware')



router.route('/products').get(getAllProducts)
router.route('/product/:id').get(getOneProduct)

// Admin Routes

router.route('/admin/product/add')
    .post(isLoggedIn, customRole('admin'), addProduct)

router.route('/admin/products')
    .get(isLoggedIn, customRole('admin'), adminGetAllProducts)


router.route('/admin/product/:id')
    .put(isLoggedIn, customRole('admin'), adminUpdateOneProduct)
    .delete(isLoggedIn, customRole('admin'), adminDeleteOneProduct)


module.exports = router 
