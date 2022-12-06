const { default: mongoose } = require('mongoose')
const moongoose = require('mongoose')


const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please provide product name'],
        trim: true,
        maxlength: [120, 'Product Name should not be more than 120 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please provide a prodcut price'],
        maxlength: [6, 'Product price should not be more than 6 digits']
    },
    description: {
        type: String,
        required: [true, 'Please provide a prodcut description'],
    },
    photos: [
        {
            id: {
                type: String,
                required: true
            },
            secure_url: {
                type: String,
                required: true
            }
        }
    ],

    category: {
        type: String,
        required: [true, 'Please provide category from- short-sleeves, long-sleeves, sweat-shirt , hoodies'],
        enum: {
            values: [
                'shortsleeves',
                'longsleeves',
                'sweatshirt',
                'hoodies'
            ],
            message: 'Please provide a valid value for category, short-sleeves, long-sleeves, sweat-shirt and  hoodies'
        }
    },
    brands: {
        type: String,
        required: [true, 'Please add a brand name']
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'user',
                required: true
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },

        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = moongoose.model('Product', productSchema)