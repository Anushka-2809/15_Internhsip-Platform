const Skill = require("../models/Skill");

// Add a new skill (for student or internship)
exports.addSkill = async (req, res) => {
  try {
    const { name, type, userId, internshipId } = req.body;

    if (!name || !type || (type === "student" && !userId) || (type === "internship" && !internshipId)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const skill = new Skill({
      name,
      type,
      user: type === "student" ? userId : undefined,
      internship: type === "internship" ? internshipId : undefined
    });

    await skill.save();
    res.json({ message: "Skill added successfully", skill });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get skills for a user or internship
exports.getSkills = async (req, res) => {
  try {
    const { type, id } = req.params; // type: student/internship, id: userId or internshipId
    const filter = type === "student" ? { user: id } : { internship: id };
    const skills = await Skill.find(filter);
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a skill by ID
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    await skill.deleteOne();
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
