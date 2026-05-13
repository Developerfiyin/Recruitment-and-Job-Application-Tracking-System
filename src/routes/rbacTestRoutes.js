const express = require("express");

const router = express.Router();

const authorizeRoles = require("../middleware/roleMiddleware");

// Temporary fake authentication middleware
const fakeAuth = (role) => {
  return (req, res, next) => {
    req.user = {
      id: "123456",
      role: role,
    };

    next();
  };
};


router.get(
  "/admin-only",
  fakeAuth("ADMIN"),
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
    });
  }
);


router.get(
  "/recruiter-only",
  fakeAuth("RECRUITER"),
  authorizeRoles("RECRUITER"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Recruiter",
    });
  }
);


router.get(
  "/applicant-only",
  fakeAuth("APPLICANT"),
  authorizeRoles("APPLICANT"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Applicant",
    });
  }
);


router.get(
  "/manage-jobs",
  fakeAuth("APPLICANT"),
  authorizeRoles("ADMIN", "RECRUITER"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Authorized to manage jobs",
    });
  }
);

module.exports = router;