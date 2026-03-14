const Resume = require("../models/Resume");
const Application = require("../models/Application");

// View resumes of a student by userId
exports.getApplicantResume = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.params.userId });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View all applications for internships created by the recruiter
exports.getApplicationsForRecruiter = async (req, res) => {
  try {
    // Applications where internship was created by this recruiter
    const applications = await Application.find({ "internship.recruiter": req.user.id })
      .populate("student", "name email")
      .populate("internship", "title company");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
