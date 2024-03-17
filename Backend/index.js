const express = require("express");
const sendMail=require("./config/mailLogic");
const connectDB = require("./config/db");
const cors=require("cors");
const userRouter = require("./routes/user.routes");
require("dotenv").config()


const app = express();
app.use(cors())
app.use(express.json());
app.use("/users",userRouter)


// app.post("/register", async (req, res) => {
//   const { email } = req.body;
//   try {
//     await sendMail(email,"hello there");
//     res.status(200).json({ msg: "Registration successful. Email sent." });
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// });

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



