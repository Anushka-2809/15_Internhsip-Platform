const Application = require("../models/Application");

exports.applyInternship = async (req, res) => {
  try {
    const { internshipId } = req.params;

    const application = await Application.create({
      internship: internshipId,
      student: req.user.id,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user.id,
    }).populate("internship");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
