const express = require("express");
const router = express.Router();

const Internship = require("../models/Internship");
const authMiddleware = require("../middleware/authMiddleware");

// Create Internship
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, company, location, stipend, description } = req.body;

    const internship = new Internship({
      title,
      company,
      location,
      stipend,
      description
    });

    await internship.save();

    res.json({
      message: "Internship created successfully",
      internship
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all internships
router.get("/", async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single internship
router.get("/:id", async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    res.json(internship);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;