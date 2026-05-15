const { body } = require("express-validator");

const validateCreateJob = [
  body("title").notEmpty().withMessage("Job title is required").trim(),

  body("description")
    .notEmpty()
    .withMessage("Job description is required")
    .isLength({ min: 20 })
    .withMessage("Description must be at least 20 characters"),

  body("company").notEmpty().withMessage("Company name is required").trim(),

  body("location").notEmpty().withMessage("Location is required").trim(),

  body("jobType")
    .notEmpty()
    .withMessage("Job type is required")
    .isIn(["full-time", "part-time", "contract", "internship", "remote"])
    .withMessage(
      "Job type must be: full-time, part-time, contract, internship, or remote"
    ),

  body("salary.min")
    .optional()
    .isNumeric()
    .withMessage("Minimum salary must be a number"),

  body("salary.max")
    .optional()
    .isNumeric()
    .withMessage("Maximum salary must be a number"),

  body("deadline")
    .optional()
    .isISO8601()
    .withMessage("Deadline must be a valid date"),
];

const validateUpdateJob = [
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),

  body("jobType")
    .optional()
    .isIn(["full-time", "part-time", "contract", "internship", "remote"])
    .withMessage("Invalid job type"),

  body("status")
    .optional()
    .isIn(["open", "closed", "draft"])
    .withMessage("Status must be: open, closed, or draft"),
];

module.exports = { validateCreateJob, validateUpdateJob };