import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "prajapatitushar789@gmail.com", // generated ethereal user
    pass: "9820259579", // generated ethereal password
  },
});

export default transporter;
