const User = require('../models/user')
const BigPromise = require('../middlewares/bigPromise')
const jwt = require('jsonwebtoken')
const CustomError = require('../utils/customErrors')
const { decode } = require('jsonwebtoken')


exports.isLoggedIn = BigPromise(async (req, res, next) => {

    const token = req.cookies.token || req.header("Authorization").replace('Bearer ', "");

    if (!token) {
        return next(new CustomError('Login first to access this page', 401))
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)

    console.log("The decoded info is below");
    console.log(decoded);

    req.user = await User.findById(decoded.id)

    next()

})


exports.customRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new CustomError('You are not allowed for this resource', 403))
        }

        next()
    };
}