const Application = require("../models/Application");

// Apply for internship
exports.applyInternship = async (req, res) => {
  try {
    const { internshipId } = req.body;

    const application = new Application({
      user: req.user.id,
      internship: internshipId
    });

    await application.save();

    res.status(201).json({ message: "Application submitted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged in user's applications
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate("internship");

    res.json(applications);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};