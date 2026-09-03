const userModel = require("../models/user.model")
const blacklistTokenModel = require("../models/blacklist.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("../config/config")



/**
 * @name registerUserController
 * @decription register new user, expects username, email and password in the request body
 * @access Public 
 */
async function registerUserController(req,res){
    const {username, email, password} =req.body
    if(!username || !email || !password){
        return res.status(400).json({
            message:"Please provide username, email and password"
        })
    }
    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"Account already exists in this email address or username"
        })
    }
    const passwordHash = await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,
        email,
        password:passwordHash
    })
    const token = jwt.sign({
        _id:user._id,
        username:user.username
    },config.JWT_SECRET,{
        expiresIn:"1d"
    })

    res.cookie("token",token)
    res.status(201).json({
        message:"User registered successfully",
        user:{
            _id:user._id,
            username:user.username,
            email:user.email,
            password:user.password
        }
    })
}

/**
 * @name loginController
 * @description login user, expects email and password
 * @access Public
 */
async function loginController(req,res){
    const{email,password} = req.body
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const token = jwt.sign({
        _id:user._id,
        username:user.username
    },config.JWT_SECRET,{
        expiresIn:"1d"
    })

    res.cookie("token",token)
    res.status(200).json({
        message:"User loggedIn successfully",
        user:{
            _id:user._id,
            username:user.username,
            email:user.email,
            password:user.password
        }
    })
}

/**
 * @name getMeController
 * @description get the current login user details
 * @access private
 */

async function getMeController(req,res){
    const user = await userModel.findById(req.user._id)
    res.status(200).json({
        message:"User details fetched successfully",
        user:{
            _id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

/**
 * @name logoutController
 * @description clear token from user cookie and add token in the blacklist
 * @access Public
 */

async function logoutController(req,res){
   const token = req.cookies.token
   if(token){
    await blacklistTokenModel.create({token})
   }
   
   res.clearCookie("token")
   res.status(200).json({
    message:"User logged out succcessfully"
   })
}

module.exports = {
    registerUserController,
    loginController,
    getMeController,
    logoutController
}