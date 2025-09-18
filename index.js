const express = require("express");
require("dotenv").config();
const cors = require("cors");
const routes = require("./api/routes/routes.js");
const { connectDB } = require("./api/config/database");
const app = express();
const nodemailer = require("nodemailer");

/**
 * Main Server Application
 *
 * This file initializes the Express server, sets up middleware,
 * configures CORS, connects to MongoDB, registers API routes,
 * and starts the HTTP server.
 *
 * @module server
 */

/**
 * Middleware Configuration
 *
 * - `express.json()` → Parse incoming JSON requests.
 * - `express.urlencoded({ extended: true })` → Parse URL-encoded payloads.
 * - `cors()` → Enable CORS for the frontend application.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://mp1-et-3-g53-yumbo-front.vercel.app",
    "https://mp-1-et-3-g53-yumbo-front.vercel.app"],
    credentials: true,
  })
);

/**
 * Main API Routes
 *
 * All API endpoints are prefixed with `/api/v1`.
 */
app.use("/api/v1", routes);

/**
 * Database Connection
 *
 * Connects to MongoDB using the `connectDB` function.
 */
connectDB();

/**
 * Health Check Endpoint
 *
 * @name HealthCheck
 * @route {GET} /
 * @returns {string} 200 - Confirmation that the server is running.
 */
app.get("/", (req, res) => res.send("Server is running"));

/**
 * Start the Server
 *
 * Only runs if this file is executed directly (not imported).
 *
 * @function
 * @param {number} PORT - Server port, defaults to 3000 if not set in environment variables.
 */
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

app.get("/api/v1/test-email", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // te lo envías a ti mismo para probar
      subject: "✅ Prueba de servidor Render",
      text: "Si recibes este correo, tu backend puede enviar emails 🚀",
    });

    res.json({ message: "Correo enviado", info });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
