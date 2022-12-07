const BigPromise = require('../middlewares/bigPromise')
const Razorpay = require('razorpay')
const stripe = require('stripe')(process.env.STRIPE_SECRET)


exports.sendStripeKey = BigPromise(async (req, res, next) => {
    res.status(200).json({
        stripeKey: process.env.STRIPE_API_KEY,
    })
})


exports.captureStripePayment = BigPromise(async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',
        metadata: { integration_check: 'Accepted a Payment' }

    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,

    })

})


exports.sendRazorpayKey = BigPromise(async (req, res, next) => {
    res.status(200).json({
        razorpay: process.env.RAZORPAY_API_KEY,
    })
})


exports.captureRazorpayPayment = BigPromise(async (req, res, next) => {
    var instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: RAZORPAY_SECRET })
    var options = {
        amount: req.body.amount,
        currency: "INR",

    }

    const myOrder = await instance.orders.create(options)


    res.status(200).json({
        success: true,
        amount: req.body.amount,
        order: myOrder
    })
})