const config = require("./config")
const mongoose = require('mongoose')

async function connectDB(){
    try{
        await mongoose.connect(config.MONGO_URI)
    console.log("Connected to DB")
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB