const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1]
        jwt.verify(token, process.env.JSON_SECRETKEY, (err, decode) => {
            if (err) {
                return res.status(200).send({
                    message: "auth Fail error", 
                    success: false
                })
            } else {
                req.body.userId = decode.id
                next()
            }
        })
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Auth Fail",
            success: false
        })
    }
}