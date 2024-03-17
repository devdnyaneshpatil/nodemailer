const mongoose=require("mongoose")
require("dotenv").config()
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to the db")
    } catch (error) {
        console.log("Database connection error",error)
        throw error
    }
}

module.exports=connectDB