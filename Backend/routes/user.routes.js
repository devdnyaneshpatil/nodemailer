const express=require("express")
const { register, login, forgetPass, changePassword } = require("../controllers/user.controller")

const userRouter=express.Router()

userRouter.post("/register",register)
userRouter.post("/login", login);
userRouter.post("/forget",forgetPass)
userRouter.patch("/changePass",changePassword)

module.exports=userRouter