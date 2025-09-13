const GlobalController = require("./GlobalController");
const TaskDAO = require("../dao/TaskDAO");

/**
 * TaskController - Handles CRUD operations for tasks.
 * Inherits all generic CRUD methods from GlobalController.
 *
 * @extends GlobalController
 */
class TaskController extends GlobalController {
  /**
   * Creates an instance of TaskController.
   * Uses TaskDAO to interact with the tasks collection in the database.
   */
  constructor() {
    super(TaskDAO);
  }
}

module.exports = new TaskController();
