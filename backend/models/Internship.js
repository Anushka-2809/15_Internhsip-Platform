const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  stipend: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Internship", internshipSchema);