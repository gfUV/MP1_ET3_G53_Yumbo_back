const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

/**
 * Task Routes
 *
 * Provides CRUD operations for tasks.
 *
 * @module api/routes/taskRoutes
 */

/**
 * GET /tasks
 *
 * Retrieve all tasks.
 *
 * @name GetAllTasks
 * @route {GET} /tasks
 * @returns {Object[]} 200 - List of tasks.
 * @returns {Object} 500 - Internal server error.
 */
router.get("/", (req, res) => TaskController.getAll(req, res));

/**
 * GET /tasks/:id
 *
 * Retrieve a single task by its ID.
 *
 * @name GetTaskById
 * @route {GET} /tasks/:id
 * @param {string} id - Task ID.
 * @returns {Object} 200 - Task object.
 * @returns {Object} 404 - Task not found.
 */
router.get("/:id", (req, res) => TaskController.read(req, res));

/**
 * POST /tasks
 *
 * Create a new task.
 *
 * @name CreateTask
 * @route {POST} /tasks
 * @body {string} title - Task title (required).
 * @body {string} [detail] - Task detail (optional).
 * @body {Date} [date] - Task date.
 * @body {string} [time] - Task time.
 * @body {string} [status] - Task status (default: "pendiente").
 * @returns {Object} 201 - Created task.
 * @returns {Object} 400 - Validation error.
 */
router.post("/", (req, res) => TaskController.create(req, res));

/**
 * PUT /tasks/:id
 *
 * Update an existing task by its ID.
 *
 * @name UpdateTask
 * @route {PUT} /tasks/:id
 * @param {string} id - Task ID.
 * @body {Object} task - Updated task fields.
 * @returns {Object} 200 - Updated task.
 * @returns {Object} 400 - Validation error.
 * @returns {Object} 404 - Task not found.
 */
router.put("/:id", (req, res) => TaskController.update(req, res));

/**
 * DELETE /tasks/:id
 *
 * Delete a task by its ID.
 *
 * @name DeleteTask
 * @route {DELETE} /tasks/:id
 * @param {string} id - Task ID.
 * @returns {Object} 200 - Deleted task.
 * @returns {Object} 404 - Task not found.
 */
router.delete("/:id", (req, res) => TaskController.delete(req, res));

module.exports = router;
