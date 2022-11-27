const mongoose = require('mongoose')
const validator = require('validator')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const crypto = require('crypto')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [40, 'Name should be under 40 characters.']
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        validate: [validator.isEmail, 'Please enter email in correct format'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a Password'],
        minlength: [6, 'Password should be atleast 6 characters long'],
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    photo: {
        id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }

    // TODO : Added a Email Verified Field and Work on it.
})


// Encrypt Password before save.

// Encrypt password befire save- HOOKS
userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)

})


// Validate the password with a passed user
userSchema.methods.isvalidatedPassword = async function (usersendPassword) {
    return await bcrypt.compare(usersendPassword, this.password)
}

// create and return jwt token
userSchema.methods.getJwtToken = async function () {
    return await jwt.sign({ id: this._id }, process.env['JWT_SECRET'], {
        expiresIn: process.env['JWT_EXPIRY']
    })
}


// Generate for forgot password token (string)
userSchema.methods.getForgotPasswordToken = function () {
    // generate a long and random String
    const forgotToken = crypto.randomBytes(20).toString('hex')

    // Getting a hash - make sure to get a hash on backend.
    this.forgotPasswordToken = crypto.createHash('sha256').update(forgotToken).digest('hex')

    // time of token
    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000

    return forgotToken

}





module.exports = mongoose.model('user', userSchema)
