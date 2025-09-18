const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Envía un correo electrónico usando SendGrid
 * @param {string} to - Destinatario
 * @param {string} subject - Asunto
 * @param {string} html - Contenido HTML
 */
async function sendEmail(to, subject, html) {
  try {
    const msg = {
      to,
      from: process.env.EMAIL_USER, // correo verificado en SendGrid
      subject,
      html,
    };
    await sgMail.send(msg);
    console.log("📨 Email enviado a", to);
  } catch (error) {
    console.error("❌ Error enviando correo:", error.response?.body || error.message);
    throw new Error("No se pudo enviar el correo");
  }
}

module.exports = { sendEmail };
