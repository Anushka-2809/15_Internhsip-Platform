const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  applyInternship,
  getMyApplications,
} = require("../controllers/applicationController");

router.post("/apply/:internshipId", authMiddleware, applyInternship);
router.get("/my", authMiddleware, getMyApplications);

module.exports = router;
