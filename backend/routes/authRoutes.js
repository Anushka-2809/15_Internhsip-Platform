const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = new User({
      name,
      email,
      password,
      role,
    });

    await user.save();

    res.json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;