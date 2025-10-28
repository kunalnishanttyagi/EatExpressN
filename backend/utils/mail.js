import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
console.log(process.env.EMAIL);
console.log(process.env.PASS);
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtpMail=async (to,otp) => {
  
    await transporter.sendMail({
        from:process.env.EMAIL,
        to,
        subject:"Reset Your Password",
        html:`<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
    })
}


// export const sendDeliveryOtpMail=async (user,otp) => {
//   // console.log(process.env.EMAIL);
//   console.log(process.env.PASS);
//   console.log("sending delivery otp mail to:", user.email);
//   console.log("otp is:", otp);
//   console.log(process.env.EMAIL);  
//   const data=await transporter.sendMail({
//         from:process.env.EMAIL,
//         to:user.email,
//         subject:"Delivery OTP",
//         html:`<p>Your OTP for delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`
//     })
//     console.log("delivery otp mail sent to:", user.email);
//     console.log(data);
// }



export const sendDeliveryOtpMail = async (user, otp) => {
  try {
    console.log("sending delivery otp mail to:", user.email);

    const data = await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Delivery OTP",
      html: `<p>Your OTP for delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`
    });

    console.log("✅ Delivery OTP mail sent to:", user.email);
    console.log(data);
    return data;
  } catch (error) {
    
    console.error(" Failed to send OTP mail:", error.message);
    throw new Error("Email sending failed");
  }
};
