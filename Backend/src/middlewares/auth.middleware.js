const jwt = require('jsonwebtoken')
const config = require("../config/config")
const blacklistTokenModel = require("../models/blacklist.model")


async function authUser(req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"token not found"
        })
    }
    const isTokenBlacklisted = await blacklistTokenModel.findOne({
        token
    })
    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Token is invalid"
        })
    }
    try{
        const decoded = jwt.verify(token,config.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(error){
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}
module.exports = {authUser}