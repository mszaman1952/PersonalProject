const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../secret');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['token'];
        if(!token) console.log("something wrong");
        const decode = jwt.verify(token, secretKey);

        req.userId = decode.tokenObj.id
        req.userEmail = decode.tokenObj.email
        req.userRole = decode.tokenObj.role;

        next();
        
    } catch (error) {
        next(createError(401, "Something Broken"));
    }
}

module.exports = {
    authMiddleware
}