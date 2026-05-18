const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
} = require("../controllers/jobController");

const {
  validateCreateJob,
  validateUpdateJob,
} = require("../validators/jobValidator");

const { handleValidationErrors } = require("../middleware/validationMiddleware");

const { protect } = require("../middleware/authMiddleware");

// ─── Protected Routes (auth commented out until auth branch is merged) ─────
router.get("/my-jobs", protect, getMyJobs);
router.post("/", protect, validateCreateJob, handleValidationErrors, createJob);
router.put("/:id", protect, validateUpdateJob, handleValidationErrors, updateJob);
router.delete("/:id", protect, deleteJob);

// ─── Public Routes ─────────────────────────────────────────────────────────
router.get("/all-jobs", getAllJobs);

router.get("/:id", getJobById);

module.exports = router;