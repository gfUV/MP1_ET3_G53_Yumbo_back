const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

/**
 * User Routes
 *
 * Provides CRUD operations for users.
 *
 * @module api/routes/userRoutes
 */

/**
 * GET /users
 *
 * Retrieve all users.
 *
 * @name GetAllUsers
 * @route {GET} /users
 * @returns {Object[]} 200 - List of users.
 * @returns {Object} 500 - Internal server error.
 */
router.get("/", (req, res) => UserController.getAll(req, res));

/**
 * GET /users/:id
 *
 * Retrieve a single user by ID.
 *
 * @name GetUserById
 * @route {GET} /users/:id
 * @param {string} id - User ID.
 * @returns {Object} 200 - User object.
 * @returns {Object} 404 - User not found.
 */
router.get("/:id", (req, res) => UserController.read(req, res));

/**
 * POST /users
 *
 * Create a new user.
 *
 * @name CreateUser
 * @route {POST} /users
 * @body {string} firstName - User's first name (required).
 * @body {string} lastName - User's last name (required).
 * @body {number} age - User's age (min 13).
 * @body {string} email - User's email (unique).
 * @body {string} password - User's password.
 * @returns {Object} 201 - Created user.
 * @returns {Object} 400 - Validation error.
 */
router.post("/", (req, res) => UserController.create(req, res));

/**
 * PUT /users/:id
 *
 * Update an existing user by ID.
 *
 * @name UpdateUser
 * @route {PUT} /users/:id
 * @param {string} id - User ID.
 * @body {Object} user - Updated user fields.
 * @returns {Object} 200 - Updated user.
 * @returns {Object} 400 - Validation error.
 * @returns {Object} 404 - User not found.
 */
router.put("/:id", (req, res) => UserController.update(req, res));

/**
 * DELETE /users/:id
 *
 * Delete a user by ID.
 *
 * @name DeleteUser
 * @route {DELETE} /users/:id
 * @param {string} id - User ID.
 * @returns {Object} 200 - Deleted user.
 * @returns {Object} 404 - User not found.
 */
router.delete("/:id", (req, res) => UserController.delete(req, res));

module.exports = router;
