const Resume = require("../models/Resume");

// Upload resume (user)
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const resume = new Resume({
      user: req.user.id,
      fileUrl: req.file.path
    });

    await resume.save();
    res.json({ message: "Resume uploaded successfully", resume });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get logged-in user's resumes
exports.getMyResume = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
