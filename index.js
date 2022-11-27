const app = require('./app')

console.log(Date.now());


app.listen(process.env.PORT, () => {
    console.log(`Server is running at Port ${process.env.PORT}`);
})