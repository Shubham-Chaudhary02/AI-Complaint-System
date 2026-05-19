const mongoose = require("mongoose");

const complaintSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },

    priority: {
      type: String,
      default: "Medium",
    },

    department: {
      type: String,
      default: "General",
    },

    summary: {
      type: String,
    },

    aiResponse: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);