const BigPromise = require('../middlewares/bigPromise')
const Product = require('../models/product')
const CustomError = require('../utils/customErrors')
const cloudinary = require('cloudinary')
const WhereClause = require('../utils/where-clause')


exports.addProduct = BigPromise(async (req, res, next) => {

    // images 

    let imageArray = [];

    console.log("Add Product Methods Called");


    console.log(req.body);
    console.log(req.body.files);

    if (!req.files) {
        return next(new CustomError('Images are required', 401))
    }


    if (req.files) {
        for (let index = 0; index < req.files.photos.length; index++) {

            let result = await cloudinary.v2.uploader.upload(req.files.photos[index].tempFilePath, {
                folder: "products"
            })

            imageArray.push({
                id: result.public_id,
                secure_url: result.secure_url
            })

        }
    }

    req.body.photos = imageArray
    req.body.user = req.user.id


    const product = await Product.create(req.body)

    res.status(200).json({ success: true, product })

})

exports.getAllProducts = BigPromise(async (req, res, next) => {


    const resultPerPage = 6

    const totalProductCount = await Product.countDocuments()



    const productsObj = new WhereClause(Product.find(), req.query).search().filter()

    let products = await productsObj.base

    const filteredProductNumber = products.length

    productsObj.pager(resultPerPage)

    products = await productsObj.base.clone()

    res.status(200).json({
        success: true,
        products,
        filteredProductNumber,
        totalProductCount
    })

})


exports.getOneProduct = BigPromise(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new CustomError('No Product found with this id', 401))
    }
    res.status(200).json({
        success: true,
        product
    })
})


exports.addAReview = BigPromise(async (req, res, next) => {

    const { rating, comment, productId } = req.body;


    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)
    const AlreadyReviewd = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())

    if (AlreadyReviewd) {
        product.reviews.forEact((review) => {
            if (review.user.toString === req.user._id.toString()) {
                review.comment = comment
                review.rating = rating
            }
        })
    }
    else {
        product.reviews.push(review)
        product.numberOfReviews = product.reviews.length
    }

    // Adjust Ratings

    product.ratings = products.reviews.reduce((acc, item) => item.rating + acc, 0)
    product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({ success: true })
})


exports.getOnlytReviewsForOneProduct = BigPromise(async (req, res, next) => {
    const { productId } = req.query

    const product = await Product.findById(productId)

    res.status(200).json({
        reviews: product.reviews
    })
})


exports.deleteReview = BigPromise(async (req, res, next) => {
    const { productId } = req.query;

    const prodcut = await Product.findById(productId)

    const reviews = prodcut.reviews.filter((rev) => rev.user.toString() === req.user._id.toString())

    const numberOfReviews = reviews.length

    await Product.findByIdAndUpdate(productId, {
        reviews,
        ratings,
        numberOfReviews
    }, {
        new: true,
        runValidators: true,
        userFindAndModify: false
    })

    res.status(200).json({
        success: true,

    })

})

// Admin only Controllers

exports.adminUpdateOneProduct = BigPromise(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new CustomError('No Product found with this id', 401))
    }

    let imageArray = []

    if (req.files) {

        // Destroy the existing Images

        for (let index = 0; index < product.photos.length; index++) {
            await cloudinary.v2.uploader.destroy(product.photos[index].id)

        }



        // Upload new images
        for (let index = 0; index < req.files.photos.length; index++) {
            let result = await cloudinary.v2.uploader.upload(product.photos[index].tempFilePath, { folder: "products" })
            imageArray.push({
                id: result.public_id,
                secure_url: result.secure_url
            })
        }



    }

    req.body.photos = imageArray
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        userFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

exports.adminGetAllProducts = BigPromise(async (req, res, next) => {
    const products = await Product.find()


    res.status(200).json({
        success: true,
        products
    })
})

exports.adminDeleteOneProduct = BigPromise(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new CustomError('No Product found with this id', 401))
    }


    if (req.files) {

        // Destroy the existing Images

        for (let index = 0; index < product.photos.length; index++) {
            await cloudinary.v2.uploader.destroy(product.photos[index].id)

        }

    }


    await product.remove()

    res.status(200).json({
        success: true,
        message: "Product was deleted"
    })
})