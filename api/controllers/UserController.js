const GlobalController = require("./GlobalController");
const UserDAO = require("../dao/UserDAO");

/**
 * UserController - Handles CRUD operations for users.
 * Inherits all generic CRUD methods from GlobalController.
 *
 * @extends GlobalController
 */
class UserController extends GlobalController {
  /**
   * Creates an instance of UserController.
   * Uses UserDAO to interact with the users collection in the database.
   */
  constructor() {
    super(UserDAO);
  }
}

module.exports = new UserController();
