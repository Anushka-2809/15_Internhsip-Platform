const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadResume, getMyResume } = require("../controllers/resumeController");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure uploads folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Upload resume
router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);

// Get logged-in user's resumes
router.get("/me", authMiddleware, getMyResume);

module.exports = router;
