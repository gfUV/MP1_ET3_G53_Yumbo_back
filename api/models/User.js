const mongoose = require("mongoose");
/**
 * User schema for MongoDB using Mongoose.
 * 
 * Represents a system user with personal information,
 * authentication data, and automatic timestamps.
 * 
 * @typedef {Object} User
 * @property {string} firstName - User's first name (required).
 * @property {string} lastName - User's last name (required).
 * @property {number} age - User's age (required, must be at least 13).
 * @property {string} email - User's unique email address (required).
 * @property {string} password - User's password (required).
 * @property {Date} createdAt - Timestamp when the user was created.
 * @property {Date} updatedAt - Timestamp when the user was last updated.
 */
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true, min: 13 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
