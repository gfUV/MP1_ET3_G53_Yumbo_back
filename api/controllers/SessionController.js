const GlobalController = require("./GlobalController");
const UserDAO = require("../dao/UserDAO"); // User Data Access Object

/**
 * SessionController - Handles user session-related actions such as login.
 * Extends GlobalController to inherit generic CRUD operations.
 */
class SessionController extends GlobalController {
  /**
   * Creates an instance of SessionController.
   * Uses UserDAO to interact with the user collection in the database.
   */
  constructor() {
    super(UserDAO); // Inherit CRUD methods from GlobalController
  }

  /**
   * Authenticate a user based on email and password.
   *
   * @async
   * @function login
   * @param {import("express").Request} req - Express request object containing `email` and `password` in the body.
   * @param {import("express").Response} res - Express response object used to return success or error messages.
   * @returns {Promise<void>} Sends a success response with userId if login is valid, otherwise an error message.
   *
   * @example
   * // Request body
   * {
   *   "email": "user@example.com",
   *   "password": "123456"
   * }
   *
   * // Success response
   * {
   *   "message": "Login correcto",
   *   "userId": "abc123"
   * }
   */
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email y contraseña son obligatorios" });
    }

    try {
      // Search for user by email using DAO
      const user = await this.dao.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "Usuario no encontrado" });
      }

      if (user.password !== password) {
        return res.status(400).json({ error: "Contraseña incorrecta" });
      }

      res.status(200).json({ message: "Login correcto", userId: user.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error en el servidor" });
    }
  }
}

module.exports = new SessionController();
