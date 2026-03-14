const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { addSkill, getSkills, deleteSkill } = require("../controllers/skillController");

// Add a skill
router.post("/add", authMiddleware, addSkill);

// Get skills for a student or internship
router.get("/:type/:id", authMiddleware, getSkills);

// Delete a skill
router.delete("/:id", authMiddleware, deleteSkill);

module.exports = router;
