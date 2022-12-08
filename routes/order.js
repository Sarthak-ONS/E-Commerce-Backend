const express = require('express')


const { createOrder, getOneOrder, getLoggedInUserOrder, adminGetAllOrders, adminDeleteAOrder } = require('../controllers/orderController');
const { adminUpdateOneProduct } = require('../controllers/product-Controller');
const router = express.Router();
const { isLoggedIn, customRole } = require('../middlewares/user-middleware')

// Routes for all Users
router.route('/order/create').post(isLoggedIn, createOrder)
router.route('/order/:id').get(isLoggedIn, getOneOrder)
router.route('/myOrder').get(isLoggedIn, getLoggedInUserOrder)
router.route('/myOrder').get(isLoggedIn, getLoggedInUserOrder)



// Admin Routes.
router.route('/admin/getAllOrders').get(isLoggedIn, customRole('admin'), adminGetAllOrders)
router.route('/admin/order/:id').put(isLoggedIn, customRole('admin'), adminUpdateOneProduct)
    .delete(isLoggedIn, customRole('admin'), adminDeleteAOrder)




module.exports = router