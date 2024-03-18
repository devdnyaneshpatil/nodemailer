const express=require("express")
const { register, login, forgetPass, changePassword, getUsers } = require("../controllers/user.controller")

const userRouter=express.Router()

userRouter.get("/",getUsers)
userRouter.post("/register",register)
userRouter.post("/login", login);
userRouter.post("/forget",forgetPass)
userRouter.patch("/changePass",changePassword)

module.exports=userRouter