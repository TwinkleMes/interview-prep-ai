const {Router} = require('express')
const userModel = require("../models/user.model")
const authMiddleware = require("../middlewares/auth.middleware")
const authController =require("../controllers/auth.controller")

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new User 
 * @access Public
 */

authRouter.post("/register",authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login the user with email and password
 * @access Public
 */

authRouter.post("/login",authController.loginController)

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add token in the blacklist
 * @access Public
 */

authRouter.get("/logout",authController.logoutController)

/**
 * @route GET /api/auth/get-me 
 * @description get the current login user details
 * @access private
 */

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)

module.exports = authRouter