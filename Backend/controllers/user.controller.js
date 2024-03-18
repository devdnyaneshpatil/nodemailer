const { hashing, verify } = require("../config/bcrypt");
const sendMail = require("../config/mailLogic");
const { generateToken } = require("../config/token");
const UserModel = require("../models/user.model");

const getUsers=async(req,res)=>{
  try {
    const users=await UserModel.find()
    res.status(200).json({msg:users})
  } catch (error) {
    res.status(500).json({msg:"Internal server Error"})
  }
}

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Bad Request: Missing required parameters" });
    }
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({ msg: "User alreasdy exist" });
    }
    const hashedPassword = await hashing(password);
    console.log(hashedPassword);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const token = generateToken(savedUser._id);
    sendMail(savedUser.email,"welcome","Thank you fro Registering")
    res.status(201).json({
      message: "User registered successfully.",
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        token
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email and password." });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await verify(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    const token = generateToken(user._id);
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const forgetPass=async(req,res)=>{
    const {email}=req.body
    try {
         if ( !email) {
           return res
             .status(400)
             .json({ msg: "Bad Request: Missing required parameters" });
         }
         const user = await UserModel.findOne({ email });
         if (!user) {
           return res.status(404).json({ error: "User not found." });
         }
         const otp = Math.floor(1000 + Math.random() * 9000);
         sendMail(email,"Request to Change Password", `Your Otp is:- ${otp}` )
         res.status(200).json({msg:"We have sent an otp to your mail please check",otp,userId:user._id})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

const changePassword=async(req,res)=>{
     const {newPassword,userId}=req.body
   try {
      const hashedPassword = await hashing(newPassword);
      await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });
      res.status(200).json({ msg: "password changed" });
   } catch (error) {
      res.status(500).json({msg:"internal server error"})
   }
}

module.exports = { register, login, forgetPass, changePassword, getUsers };
