const app = require('./app');
const connectWithDB = require('./config/db');


const cloudinary = require('cloudinary')




// Connect with Database
connectWithDB()

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running at Port ${process.env.PORT}`);
})