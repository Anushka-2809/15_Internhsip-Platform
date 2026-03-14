const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true }, // skill name, e.g., "React", "Python"
  type: { type: String, enum: ["student", "internship"], required: true }, // whether this skill is linked to a student or an internship
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: function() { return this.type === "student"; } }, // optional link to student
  internship: { type: mongoose.Schema.Types.ObjectId, ref: "Internship", required: function() { return this.type === "internship"; } }, // optional link to internship
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Skill", SkillSchema);
