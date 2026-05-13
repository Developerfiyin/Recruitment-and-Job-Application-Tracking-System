const express = require("express");

const router = express.Router();

const { protect: authMiddleware } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get(
  "/admin-only",
  authMiddleware,
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
  authMiddleware,
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
  authMiddleware,
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
  authMiddleware,
  authorizeRoles("ADMIN", "RECRUITER"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Authorized to manage jobs",
    });
  }
);

module.exports = router;
