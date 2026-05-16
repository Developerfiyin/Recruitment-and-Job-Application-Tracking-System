const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    salary: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: "NGN" },
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship", "remote"],
      required: [true, "Job type is required"],
    },
    status: {
      type: String,
      enum: ["open", "closed", "draft"],
      default: "open",
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requirements: [{ type: String }],
    deadline: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
