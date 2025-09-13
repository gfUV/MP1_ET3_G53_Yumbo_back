const express = require("express");
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");
const sessionRoutes = require("./session");

const router = express.Router();

/**
 * Main API router.
 *
 * This file centralizes all route modules and mounts them under
 * their respective base paths.
 *
 * @module api/routes/index
 *
 * Mounted routes:
 * - `/users` → User management routes
 * - `/tasks` → Task management routes
 * - `/sessions` → Authentication and session routes
 */


router.use("/users", userRoutes);

router.use("/tasks", taskRoutes);

router.use("/sessions", sessionRoutes);

module.exports = router;
