const express = require("express");
const router = express.Router();
const PasswordController = require("../controllers/PasswordController");

/**
 * POST /auth/reset-password
 * Envía un correo con el enlace de reseteo
 */
router.post("/reset-password", (req, res) =>
  PasswordController.requestReset(req, res)
);

/**
 * POST /auth/reset-password/confirm
 * Restablece la contraseña usando el token
 */
router.post("/reset-password/confirm", (req, res) =>
  PasswordController.resetPassword(req, res)
);

module.exports = router;
