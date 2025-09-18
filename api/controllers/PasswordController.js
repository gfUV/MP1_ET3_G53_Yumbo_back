const UserDAO = require("../dao/UserDAO");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

/**
 * PasswordController
 * Maneja la recuperación y reseteo de contraseñas.
 */
class PasswordController {
  /**
   * Inicia el proceso de reset enviando un correo.
   */
  async requestReset(req, res) {
    try {
      const { email } = req.body;

      const user = await UserDAO.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Generar token único y fecha de expiración
      const token = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

      await user.save();

      // Configurar transporte de nodemailer
      const transporter = nodemailer.createTransport({
        service: "Gmail", // puedes usar otro como Outlook, SendGrid, etc.
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const resetUrl = `https://mp1-et-3-g53-yumbo-front.vercel.app/reset_confirm.html?token=${token}`;

      await transporter.sendMail({
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: "Recuperación de contraseña",
        html: `
          <p>Hola,</p>
          <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace:</p>
          <a href="${resetUrl}">Restablecer contraseña</a>
          <p>Si no solicitaste este cambio, ignora este correo.</p>
        `,
      });

      res.json({ message: "Correo de recuperación enviado" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Restablece la contraseña con el token
   */
  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;

      const user = await UserDAO.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ message: "Token inválido o expirado" });
      }

      user.password = newPassword; // asegúrate que tu modelo tenga hash en pre-save
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      res.json({ message: "Contraseña actualizada con éxito" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PasswordController();
