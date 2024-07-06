const mongoose = require('mongoose')
const colors = require('colors')

const connectDb = async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/expenseApp',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`server running on ${mongoose.connection.host}`.bgCyan.white);
    }
    catch(error){
        console.log(`error ${error}`.bgRed);
    }
}


module.exports = connectDb
