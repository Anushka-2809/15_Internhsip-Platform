const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Internship = require("../models/Internship");
const authMiddleware = require("../middleware/authMiddleware");

// -------------------- Create Internship --------------------
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, company, location, stipend, description } = req.body;

    if (!title || !company || !location || !stipend || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const internship = new Internship({
      title,
      company,
      location,
      stipend,
      description,
      // Optional: track creator for authorization
      // createdBy: req.user.id
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

// -------------------- Get All Internships --------------------
router.get("/", async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// -------------------- Get Single Internship --------------------
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid internship ID" });
    }

    const internship = await Internship.findById(id);

    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    res.json(internship);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// -------------------- Update Internship --------------------
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid internship ID" });
    }

    const internship = await Internship.findById(id);
    if (!internship) return res.status(404).json({ message: "Internship not found" });

    // Optional: Only allow creator to update
    // if (internship.createdBy.toString() !== req.user.id) {
    //   return res.status(403).json({ message: "Not authorized" });
    // }

    const { title, company, location, stipend, description } = req.body;
    internship.title = title || internship.title;
    internship.company = company || internship.company;
    internship.location = location || internship.location;
    internship.stipend = stipend || internship.stipend;
    internship.description = description || internship.description;

    await internship.save();
    res.json({ message: "Internship updated successfully", internship });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// -------------------- Delete Internship --------------------
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid internship ID" });
    }

    const internship = await Internship.findById(id);
    if (!internship) return res.status(404).json({ message: "Internship not found" });

    // Optional: Only allow creator to delete
    // if (internship.createdBy.toString() !== req.user.id) {
    //   return res.status(403).json({ message: "Not authorized" });
    // }

    await internship.deleteOne();
    res.json({ message: "Internship deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
