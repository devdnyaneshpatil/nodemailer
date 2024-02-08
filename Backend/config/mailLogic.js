const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Welcome to NodeJS App",
    text: "This is an email using nodemailer in Node.js",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email send failed with error:", error);
  }
};

module.exports = sendMail;
