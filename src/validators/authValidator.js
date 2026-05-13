const { body } = require('express-validator');

exports.registerValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),

  body('email')
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .isLength({ max: 120 })
    .withMessage("Email is too long"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter"),

  body("role")
    .optional()
    .isIn(["ADMIN", "RECRUITER", "APPLICANT"])
    .withMessage("Role must be ADMIN, RECRUITER, or APPLICANT"),
];

exports.loginValidator = [
  body('email')
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address"),
  body('password')
    .notEmpty()
    .withMessage("Password is required"),
];
