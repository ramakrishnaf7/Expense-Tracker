const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required:[true,'name is require']
    },
    email:{
        type : String,
        required:[true,'email id required and should be unique'],
        unique:true
    },
    password:{
        type: String,
        required:[true,'password is requied']
    },
},{timestamps:true}
);

const userModel = mongoose.model('users',userSchema)

module.exports = userModel