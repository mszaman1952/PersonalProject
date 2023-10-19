const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email : {
        type : String,
        unique : true,
        required : [true, "Email is Required"],
        trim : true,
        validate : {
            validator : function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            },
            message : "Enter a Valid Email Address"
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        set : (v) => {
            return bcrypt.hashSync(v, bcrypt.genSaltSync(10));
        },
    },
    role : {
        type : Boolean,
        default : false
    }
}, { timestamps : true, versionKey : false });
    
const User = model('user', userSchema);

module.exports = {
    User
}
