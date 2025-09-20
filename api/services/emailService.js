// /api/services/emailService.js
const nodemailer = require("nodemailer");

/**
 * Email service using Nodemailer and SendGrid as the transport.
 * Provides functionality to send emails within the application.
 * @module services/emailService
 */

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey", 
    pass: process.env.SENDGRID_API_KEY, // your SendGrid API Key
  },
});

/**
 * Sends an email using the configured transporter.
 *
 * @async
 * @function sendEmail
 * @param {Object} options - Email sending options.
 * @param {string} options.to - Recipient email address.
 * @param {string} options.subject - Subject of the email.
 * @param {string} options.html - HTML body of the email.
 * @returns {Promise<Object>} A promise that resolves with the result of the sending operation.
 * @throws {Error} If sending the email fails.
 *
 * @example
 * await sendEmail({
 *   to: "user@example.com",
 *   subject: "Recuperación de contraseña",
 *   html: "<p>Hola, haz clic en el enlace para restablecer tu contraseña</p>"
 * });
 */
async function sendEmail({ to, subject, html }) {
  return transporter.sendMail({
    from: process.env.EMAIL_USER, // verified sender in SendGrid
    to,
    subject,
    html,
  });
}

module.exports = { sendEmail };
