const express = require("express js");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth route working");
});

module.exports = router;