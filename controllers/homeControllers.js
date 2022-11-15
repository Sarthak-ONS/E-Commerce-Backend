const BigPromise = require('../middlewares/bigPromise')


exports.home = BigPromise(async (req, res) => {

    res.status(200).json({
        "success": true,
        "greeting": "Hello from Home Controller"
    })
})

exports.homeDummy = BigPromise(async (req, res) => {

    res.status(200).json({
        "success": true,
        "greeting": "Hello from Home Controller and Dummy Route"
    })
})