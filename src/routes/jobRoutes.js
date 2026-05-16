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

// ─── Public Routes ─────────────────────────────────────────────────────────
router.get("/", getAllJobs);
router.get("/my-jobs", getMyJobs);
router.get("/:id", getJobById);

// ─── Protected Routes (auth commented out until auth branch is merged) ─────
router.post("/", validateCreateJob, handleValidationErrors, createJob);
router.put("/:id", validateUpdateJob, handleValidationErrors, updateJob);
router.delete("/:id", deleteJob);

module.exports = router;