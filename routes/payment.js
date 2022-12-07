const express = require('express')

const router = express.Router()

const { sendStripeKey, sendRazorpayKey, captureRazorpayPayment, captureStripePayment } = require('../controllers/payment-Controller')

const { isLoggedIn, customRole } = require('../middlewares/user-middleware')


// Sending keys
router.route('/stripeKey').get(isLoggedIn, sendStripeKey)
router.route('/razorpayKey').get(isLoggedIn, sendRazorpayKey)


// Opening Intent
router.route('/captureStripe').get(isLoggedIn, captureStripePayment)
router.route('/captureRazorpay').get(isLoggedIn, captureRazorpayPayment)

module.exports = router


