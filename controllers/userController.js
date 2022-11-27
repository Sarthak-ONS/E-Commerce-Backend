const User = require('../models/user')
const BigPromise = require('../middlewares/bigPromise')

const CustomError = require('../utils/customErrors');
const cookieToken = require('../utils/cookieToken');

const fileUpload = require('express-fileupload')

const cloudinary = require('cloudinary');
const user = require('../models/user');


exports.signup = BigPromise(async (req, res, next) => {

    let result;

    if (!req.files) {
        return next(new CustomError('Photo is required for signup'))
    }

    const { name, email, password } = req.body;
    if (!email || !name || !password) {
        return next(new CustomError('Name, email and password are required', 400));
    }




    let file = req.files.photo
    result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "users",
        width: 150,
        crop: "scale"
    })


    const user = await User.create({
        name,
        email,
        password,
        photo: {
            id: result.public_id,
            secure_url: result.secure_url,
        }
    })

    cookieToken(user, res)



})



exports.login = BigPromise(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new CustomError('Please provide email and password', 400))

    }

    const user = await User.findOne({ email }).select("+password")


    if (!user) {
        return next(new CustomError('You are not registered with us', 400))
    }

    const isPasswordCorrect = await user.isvalidatedPassword(password)

    if (!isPasswordCorrect) {
        return next(new CustomError('Wrong Password', 400))
    }

    cookieToken(user, res)

})