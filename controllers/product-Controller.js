const BigPromise = require('../middlewares/bigPromise')
const Product = require('../models/product')
const CustomError = require('../utils/customErrors')
const cloudinary = require('cloudinary')


exports.addProduct = BigPromise(async (req, res) => {

    // images 

    let imageArray = [];

    if (!req.files)
        return next(new CustomError('Images are required', 401))

    for (let index = 0; index < req.files.photos; index++) {

        let result = await cloudinary.v2.uploader.upload(req.files.photos[index].tempFilePath, {
            folder: "products"
        })

        imageArray.push({
            id: result.public_id,
            secure_url: result.secure_url
        })

    }

    req.body.photos = imageArray

    req.body.user = req.user.id



})