const nodemailer = require("nodemailer");
require('dotenv').config();

const user = process.env.USER
const transport = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port:465,
  secure:true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log("Sending Mail"); 
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please Confirm Your Account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3000/activate/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  };