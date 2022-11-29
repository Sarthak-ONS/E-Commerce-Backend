const User = require('../models/user')
const BigPromise = require('../middlewares/bigPromise')

const CustomError = require('../utils/customErrors');
const cookieToken = require('../utils/cookieToken');

const fileUpload = require('express-fileupload')

const cloudinary = require('cloudinary');
const user = require('../models/user');
const mailHelper = require('../utils/email-helper');


const crypto = require('crypto')


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


exports.logout = BigPromise(async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({ success: true, message: "Logout Success" })

})


exports.forgotPassword = BigPromise(async (req, res, next) => {
    const { email } = req.body;


    const user = await User.findOne({ email })


    if (!user) {
        return next(new CustomError('Email not found as registered', 400))
    }

    const forgotToken = user.getForgotPasswordToken()

    await user.save({ validateBeforeSave: false })


    const myUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${forgotToken}`

    const message = `Copy paste this link in ur url and hit enter \n \n ${myUrl}`

    try {

        await mailHelper({
            email: user.email,
            subject: "E Commerce Backend -  Password Reset Email",
            message
        })
        res.status(200).json({
            success: true,
            message: "Email sent Successfully."
        })

    } catch (error) {
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined
        await user.save({ validateBeforeSave: false })
        console.log("Error in sending email");
        console.log(e);

        return next(new CustomError(error.message, 500))
    }

})




exports.passwordReset = BigPromise(async (req, res, next) => {
    const token = req.params.token

    const encryptedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex')

    const user = await User.findOne({
        encryptedToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    })

    if (!user) {
        return next(new CustomError('Token is invalid or expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new CustomError('Password and Confirm Passsword doesnt match', 400))
    }

    user.password = req.body.password

    user.forgotPasswordExpiry = undefined
    user.forgotPasswordToken = undefined

    await user.save()

    // 

    cookieToken(user, res)


})



exports.getLoggedInUserDetails = BigPromise(async (req, res, next) => {
    
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user,
    })
})

 // TODO : We dont have any errors for already singed up Users. 