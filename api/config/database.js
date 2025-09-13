const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Establishes a connection to the MongoDB database using the URI
 * stored in the environment variable `MONGO_URI`.
 *
 * @async
 * @function connectDB
 * @throws {Error} If the connection fails, logs the error and exits the process.
 * @returns {Promise<void>} Resolves when the connection is successful.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

/**
 * Disconnects from the MongoDB database.
 *
 * @async
 * @function disconnectDB
 * @throws {Error} If the disconnection fails, logs the error.
 * @returns {Promise<void>} Resolves when the disconnection is successful.
 */
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error.message);
  }
};

module.exports = { connectDB, disconnectDB };
