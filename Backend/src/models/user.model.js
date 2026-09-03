const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already taken"],
        required:true,
    },
    email:{
        type:String,
        unique:[true,"Account already exists in this email id"],
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel