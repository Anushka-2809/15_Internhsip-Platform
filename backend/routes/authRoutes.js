const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth route working");
});

router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  res.json({
    message: "User registered successfully",
    user: {
      name,
      email,
      role
    }
  });
});

module.exports = router;