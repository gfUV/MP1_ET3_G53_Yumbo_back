const express = require("express");
const router = express.Router();
const SessionController = require("../controllers/SessionController");

/** Endpoint login */
router.post("/login", (req, res) => SessionController.login(req, res));

module.exports = router;
