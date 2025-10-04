import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
console.log("Nodemailer USER:", process.env.EMAIL);
console.log("Nodemailer PASS:", process.env.PASSWORD);
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,

  },
});

export const sendMail=async(to,otp)=>{
  console.log(to,otp);
  console.log(process.env.EMAIL, process.env.PASSWORD);
    await transporter.sendMail({
    from: process.env.EMAIL,
    to:to,
    subject: "Reset Password",
     // plain‑text body
    text: "Hello world?",
    html: `<p>Your OTP for password reset is <b>${otp} </b>. It wil expire in 5 min </p> ` // HTML body
  });

  // console.log("Message sent:", info.messageId);
}
