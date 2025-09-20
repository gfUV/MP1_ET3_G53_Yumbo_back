const UserDAO = require("../dao/UserDAO");
const crypto = require("crypto");
const { sendEmail } = require("../services/emailService");

/**
 * Controller responsible for managing password recovery and reset processes.
 * @class
 */
class PasswordController {
  /**
   * Initiates the password reset process by generating a token and sending
   * an email with reset instructions to the user.
   *
   * @async
   * @function requestReset
   * @param {import("express").Request} req - Express request object containing the user email.
   * @param {import("express").Response} res - Express response object used to send responses.
   * @returns {Promise<void>} Sends a JSON response with a success or error message.
   */
  async requestReset(req, res) {
    try {
      const { email } = req.body;

      const user = await UserDAO.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Generate a unique token and set expiration date (1 hour)
      const token = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      await user.save();

      const resetUrl = `https://mp-1-et-3-g53-yumbo-front.vercel.app/resetPass_confirm.html?token=${token}`;

      console.log("Enviando correo a:", user.email); // Debugging log

      await sendEmail({
        to: user.email,
        subject: "Recuperación de contraseña",
        html: `
          <p>Hola,</p>
          <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace:</p>
          <a href="${resetUrl}">Restablecer contraseña</a>
          <p>Si no solicitaste este cambio, ignora este correo.</p>
        `
      });

      res.json({ message: "Correo de recuperación enviado" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Resets the user's password using the provided token and new password.
   *
   * @async
   * @function resetPassword
   * @param {import("express").Request} req - Express request object containing the token and new password.
   * @param {import("express").Response} res - Express response object used to send responses.
   * @returns {Promise<void>} Sends a JSON response with a success or error message.
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

      // Ensure your model has password hashing in a pre-save hook
      user.password = newPassword;
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
