const mongoose = require("mongoose");

/**
 * Task schema for MongoDB using Mongoose.
 * 
 * Represents a task with a title, optional detail, date, time,
 * and status.
 * 
 * @typedef {Object} Task
 * @property {string} title - Title of the task (required, max 50 characters).
 * @property {string} [detail] - Additional details about the task (optional, max 50 characters).
 * @property {Date} [date] - Date associated with the task (optional).
 * @property {string} [time] - Time associated with the task (optional).
 * @property {"pendiente" | "en-progreso" | "completada"} status - Status of the task, defaults to "pendiente".
 * @property {Date} createdAt - Timestamp when the task was created.
 * @property {Date} updatedAt - Timestamp when the task was last updated.
 */
const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 50 },
    detail: { type: String, maxlength: 50 },
    date: { type: Date },
    time: { type: String },
    status: { 
      type: String, 
      enum: ["pendiente", "en-progreso", "completada"], 
      default: "pendiente" 
    },
    userId: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
