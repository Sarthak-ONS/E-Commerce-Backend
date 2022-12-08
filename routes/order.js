const express = require('express')


const { createOrder, getOneOrder, getLoggedInUserOrder } = require('../controllers/orderController')
const router = express.Router();
const { isLoggedIn, customRole } = require('../middlewares/user-middleware')


router.route('/order/create').post(isLoggedIn, createOrder)
router.route('/order/:id').get(isLoggedIn, getOneOrder)
router.route('/myOrder').get(isLoggedIn, getLoggedInUserOrder)


module.exports = router