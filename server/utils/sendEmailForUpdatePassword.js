const nodemailer = require("nodemailer");

const user = process.env.USER;
const pass = process.env.PASS;

const transport = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port:465,
  secure:true,
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendPasswordUpdateEmail = (email, userFind, setusertoken) => {
    console.log("Sending password update Mail"); 
    transport.sendMail({
      from: user,
      to: email,
      subject: "Update Password.",
      html: `<h1>Password Update Link...</h1>
          <h2>Hello ${userFind.name}</h2>
          <p>Update your password by clicking on the following link. Note that this link will be valid only for 2 minutes. </p>
          <a href=http://localhost:3000/forgotpassword/${userFind.id}/${setusertoken.verifytoken}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  };