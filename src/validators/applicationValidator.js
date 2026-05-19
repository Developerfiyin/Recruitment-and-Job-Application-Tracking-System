const { body } = require("express-validator");

const applyForJobValidator = [
  body("jobId")
    .notEmpty()
    .withMessage("Job ID is required")
    .isMongoId()
    .withMessage("Job ID must be a valid Mongo ID"),

  body("coverLetter")
    .notEmpty()
    .withMessage("Cover letter is required")
    .isLength({ min: 50 })
    .withMessage("Cover letter must be at least 50 characters long")
    .trim(),

];

const updateApplicationStatusValidator = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["pending", "reviewed", "accepted", "rejected"])
    .withMessage(
      "Status must be one of: pending, reviewed, accepted, or rejected"
    ),
];

module.exports = {
  applyForJobValidator,
  updateApplicationStatusValidator,
};
