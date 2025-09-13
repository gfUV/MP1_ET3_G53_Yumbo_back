const Task = require("../models/Task");
const GlobalDAO = require("./GlobalDAO");

/**
 * Data Access Object (DAO) for tasks.
 * 
 * This class extends the generic GlobalDAO to handle CRUD operations
 * for the Task model.
 * 
 * @extends GlobalDAO
 */
class TaskDAO extends GlobalDAO {
  /**
   * Creates an instance of TaskDAO.
   * Passes the Task model to the GlobalDAO constructor.
   */
  constructor() {
    super(Task);
  }
}

module.exports = new TaskDAO();
