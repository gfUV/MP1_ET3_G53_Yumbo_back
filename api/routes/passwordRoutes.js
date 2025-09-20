const express = require("express");
const router = express.Router();
const PasswordController = require("../controllers/PasswordController");

/**
 * Defines authentication-related routes for password reset and confirmation.
 * @module routes/password
 */

/**
 * POST /auth/reset-password
 * Sends an email with a password reset link.
 *
 * @name POST /auth/reset-password
 * @function
 * @memberof module:routes/password
 * @inner
 * @param {express.Request} req - Express request object containing the user email.
 * @param {express.Response} res - Express response object used to send responses.
 */
router.post("/reset-password", (req, res) =>
  PasswordController.requestReset(req, res)
);

/**
 * POST /auth/reset-password/confirm
 * Resets the password using the provided token and new password.
 *
 * @name POST /auth/reset-password/confirm
 * @function
 * @memberof module:routes/password
 * @inner
 * @param {express.Request} req - Express request object containing the token and new password.
 * @param {express.Response} res - Express response object used to send responses.
 */
router.post("/reset-password/confirm", (req, res) =>
  PasswordController.resetPassword(req, res)
);

module.exports = router;
