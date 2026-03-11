const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");

// Apply for internship
router.post("/apply", authMiddleware, applicationController.applyInternship);

// Get my applications
router.get("/my", authMiddleware, applicationController.getMyApplications);

module.exports = router;