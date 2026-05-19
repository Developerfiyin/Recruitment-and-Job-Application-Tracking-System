const express = require("express");

const {
    applyForJob,
    getMyApplications,
    getApplicationById,
    updateApplicationStatus,
    deleteApplication
} = require("../controllers/applicationController.js");

const upload = require("../middleware/upload");
const { protect } = require("../middleware/authMiddleware.js");
const { handleValidationErrors } = require("../middleware/validationMiddleware");
const {
  applyForJobValidator,
  updateApplicationStatusValidator,
} = require("../validators/applicationValidator.js");

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("resume"),
  applyForJobValidator,
  handleValidationErrors,
  applyForJob
);
router.get("/all-applications", protect, getMyApplications);
router.get("/:id", protect, getApplicationById);
router.put(
  "/:id/status",
  protect,
  updateApplicationStatusValidator,
  handleValidationErrors,
  updateApplicationStatus
);
router.delete("/:id", protect, deleteApplication);

module.exports = router;