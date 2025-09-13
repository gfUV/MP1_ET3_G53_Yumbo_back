const User = require("../models/User");
const GlobalDAO = require("./GlobalDAO");

/**
 * Data Access Object (DAO) for users.
 * 
 * This class extends the generic GlobalDAO to handle CRUD operations
 * for the User model.
 * 
 * @extends GlobalDAO
 */
class UserDAO extends GlobalDAO {
  /**
   * Creates an instance of UserDAO.
   * Passes the User model to the GlobalDAO constructor.
   */
  constructor() {
    super(User);
  }
}

module.exports = new UserDAO();
