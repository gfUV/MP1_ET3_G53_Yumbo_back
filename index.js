const express = require("express");
require("dotenv").config();
const cors = require("cors");
const routes = require("./api/routes/routes.js");
const {connectDB} = require("./api/config/database");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "https://mp-1-et-3-g53-yumbo-front.vercel.app",
  credentials: true
}));

// Rutas principales
app.use("/api/v1", routes);

// Conectar a MongoDB
connectDB();

// Health check
app.get("/", (req, res) => res.send("Server is running"));

// Levantar servidor
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
