const express = require("express");
const sendMail=require("./config/mailLogic");
const connectDB = require("./config/db");
const cors=require("cors");
const userRouter = require("./routes/user.routes");
const { notFound, errorMiddleware } = require("./middlewares/error.middleware");
require("dotenv").config()


const app = express();
app.use(cors())
app.use(express.json());
app.use("/users",userRouter)
app.all("*",notFound)
app.use(errorMiddleware)

const PORT = process.env.PORT||6000;

connectDB()
.then(()=>{
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error)=>{
  console.error("Error connecting database",error)
  process.exit(1)
})



