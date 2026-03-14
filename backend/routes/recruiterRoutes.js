const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getApplicantResume, getApplicationsForRecruiter } = require("../controllers/recruiterController");

// Get all applications for recruiter
router.get("/applications", authMiddleware, getApplicationsForRecruiter);

// Get resumes of a student by userId
router.get("/resume/:userId", authMiddleware, getApplicantResume);

module.exports = router;
