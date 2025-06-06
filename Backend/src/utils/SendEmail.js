const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, 
  },
});


const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  });
 

};
const genOTP = () => {
    const size = 4;
    let OTP = "";
    for (let i = 1; i <= size; i++) {
      OTP += Math.floor(Math.random() * 10);
    }
    return OTP;
  };

module.exports = { sendOTP, genOTP }