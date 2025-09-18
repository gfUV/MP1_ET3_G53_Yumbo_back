// /api/services/emailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey", // literal, no cambies
    pass: process.env.SENDGRID_API_KEY, // tu API Key de SendGrid
  },
});

async function sendEmail({ to, subject, html }) {
  return transporter.sendMail({
    from: process.env.EMAIL_USER, // remitente verificado en SendGrid
    to,
    subject,
    html,
  });
}

module.exports = { sendEmail };
