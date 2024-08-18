const mongoose = require('mongoose')
const colors = require('colors')

const connectDb = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/expenseApp');
        console.log(`server running on ${mongoose.connection.host}`.bgCyan.white);
    }
    catch(error){
        console.log(`error ${error}`.bgRed)
    }
}


module.exports = connectDb;