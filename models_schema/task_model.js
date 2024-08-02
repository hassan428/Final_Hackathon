const mongoose = require("mongoose");

const task_schema = mongoose.Schema(
  {
    task_name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    start_time: {
      type: String,
      required: true,
    },
    end_time: {
      type: String,
      required: true,
    },
    board: {
      type: String,
      enum: ["Urgent", "Running", "Ongoing"],
      default: "Running",
    },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  },
  {
    timestamps: true,
  }
);
const task_model = mongoose.model("task", task_schema);

module.exports = task_model;
