const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String
        },
        city: {
            type: String
        },
        phoneNo: {
            type: String
        },
        postalCode: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    orderitems: [
        {
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product ',
                required: true,
            },
        }
    ],
    paymentInfo: {
        id: {
            type: String
        }
    },
    taxAmount: {
        type: Number,
        required: true
    },
    shippingAmount: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'processing'
    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})



module.exports = orderSchema