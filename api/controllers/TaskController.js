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

   async getAll(req, res) {
    try {
      const { userId } = req.query;

      let filter = {};
      if (userId) {
        filter.userId = userId;
      }

      const tasks = await this.dao.getAll(filter);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new TaskController();
