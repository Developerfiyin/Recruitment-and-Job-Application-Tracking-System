const express = require("express");

const {
    applyForJob,
    getMyApplications,
    getApplicationById,
    updateApplicationStatus,
    deleteApplication
} = require("../controllers/applicationController.js");

const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();



router.post("/", applyForJob);
router.get("/", protect, getMyApplications);
router.get("/:id", protect, getApplicationById);
router.put("/:id/status", protect, updateApplicationStatus);
router.delete("/:id", protect, deleteApplication);


module.exports = router;