const createError = require("http-errors");
const { User } = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretKey } = require("../../secret");

// user register 
const userRegister = async(req,res, next) => {
    try {
        const { email, password } = req.body;
        // find existing email 
        const user = await User.findOne({email});
        if(user){
            res.status(200).json({
                status : "Failed",
                message : "User already register, Please Login"
            });
        }

        // save user information 
        await User.create({email, password});
        res.status(200).json({
            status : "Success",
            message : "Registration Successfully"
        });
    } catch (error) {
        next(createError(404, error));
    }
}

// user login 
const usreLogin = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({
                status : "Failed",
                message : "User Not Found, Please Register"
            });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "Failed",
                message: "Invalid password."
            });
        }

        const tokenObj = {
            email : user.email,
            id : user._id,
            role : user.role,
        }
        const token = jwt.sign({tokenObj}, secretKey,{
            expiresIn : 7 * 24 * 60 * 60 
        });

        res.status(200).json({
            status : "Success",
            token
        });

    } catch (error) {
        next(createError(404, error))
    }
}

module.exports = {
    userRegister,
    usreLogin
}
