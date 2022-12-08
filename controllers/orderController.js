const Order = require('../models/order')
const Product = require('../models/product')


const BigPromise = require('../middlewares/bigPromise');
const CustomError = require('../utils/customErrors');


exports.createOrder = BigPromise(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        taxAmount,
        shippingAmount,
        totalAmount
    } = req.body;


    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        taxAmount,
        shippingAmount,
        totalAmount,
        user: req.user._id
    })


    res.status(200).json({
        success: true,
        order
    })
})


exports.getOneOrder = BigPromise(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        return next(new CustomError('Please checkk a order Id', 401))
    }
    res.status(200).json({
        success: true,
        order
    })
})



exports.getLoggedInUserOrder = BigPromise(async (req, res, next) => {


    const order = await Order.find({ user: req.user._id })



    if (!order) {
        return next(new CustomError('Please checkk a user Id', 401))
    }
    res.status(200).json({
        success: true,
        order
    })

})