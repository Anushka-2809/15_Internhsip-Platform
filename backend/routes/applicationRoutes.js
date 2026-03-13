const express = require("express");
const router = express.Router();

const {
  applyInternship,
  getMyApplications,
  getApplicationsForInternship
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/apply", authMiddleware, applyInternship);
router.get("/my", authMiddleware, getMyApplications);
router.get("/internship/:id", authMiddleware, getApplicationsForInternship);

module.exports = router;