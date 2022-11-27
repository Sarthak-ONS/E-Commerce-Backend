const mongoose = require('mongoose')

const connectWithDB = () => {
    mongoose.connect(process.env.DB_URL, {
        // useNewUrlParser: true,
        // useUnifiedToplogy: true

    })
        .then(console.log("DB Connected Successfully"))
        .catch(e => {
            console.log('DB Connection Unsuccessfull.');
            console.log(e);
            process.exit(1);
        })
}


module.exports = connectWithDB