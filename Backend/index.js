const express = require("express");
const sendMail=require("./config/mailLogic")


const app = express();
app.use(express.json());


app.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    await sendMail(email);
    res.status(200).json({ msg: "Registration successful. Email sent." });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
