const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
router.post(
  "/resume",
  (req, res) => {
    upload.single("resume")(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        });
      }
      return res.status(200).json({
        success: true,
        message: "Resume uploaded successfully",
        file: req.file
      });
    });
  }
);
module.exports = router;