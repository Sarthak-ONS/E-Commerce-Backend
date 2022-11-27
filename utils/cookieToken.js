

const cookieToken = async (user, res) => {


    const token = await user.getJwtToken()

    console.log(`The token for this user is ${token}`);
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_TIME * 24 * 60 * 1000),
        httpOnly: true,
    }
    user.password = undefined;
    res.status(200).cookie('token', token, options).json({
        success: true,
        token,
        user
    })

}


module.exports = cookieToken