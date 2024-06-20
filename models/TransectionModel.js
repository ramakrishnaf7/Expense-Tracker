const mongoose = require('mongoose')


const TransectionSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:[true,'amount is require']
    },
    type:{
        type : String,
        required : [true,'type is required']
    },
    category:{
        type:String,
        requird:[true,'cat is required']
    },
    reference:{
        type: String,
    },
    description:{
        type: String,
        required:[true,'desc is required']
    },
    date:{
        type:Date,
        required:[true,'date is required']
    }
},{timestamps:true}
);

const TransectionModel = mongoose.model('transections',TransectionSchema)

module.exports = TransectionModel