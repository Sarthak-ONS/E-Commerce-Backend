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



    const products = new WhereClause(Product.find(), req.query).search().filter()

    const filteredProductNumber = products.length

    products.pager(resultPerPage)

    products = await products.base

    res.status(200).json({
        success: true,
        products,
        filteredProductNumber,
        totalProductCount
    })


})
