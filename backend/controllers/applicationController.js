import Application from "../models/Application.js";
import Internship from "../models/Internship.js";
import { ApiResponse, ApiError, asyncHandler } from "../utils/helpers.js";


// APPLY FOR INTERNSHIP
export const applyForInternship = asyncHandler(async (req, res) => {
  const { internshipId } = req.params;

  // resume from body or uploaded file
  const resumeUrl = req.body.resumeUrl || req.file?.path;

  // Check internship exists
  const internship = await Internship.findById(internshipId);
  if (!internship) {
    throw new ApiError(404, "Internship not found");
  }

  // Check duplicate application
  const existingApplication = await Application.findOne({
    student: req.user.id,
    internship: internshipId
  });

  if (existingApplication) {
    throw new ApiError(400, "You have already applied");
  }

  // Create application
  const application = await Application.create({
    student: req.user.id,
    internship: internshipId,
    resumeUrl
  });

  res.status(201).json(
    new ApiResponse(201, application, "Applied successfully")
  );
});


//  GET STUDENT APPLICATIONS
export const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({
    student: req.user.id
  })
    .populate("internship", "title companyName location stipend")
    .sort({ createdAt: -1 });

  res.json(
    new ApiResponse(200, applications, "Applications fetched")
  );
});


//  GET APPLICATIONS FOR A RECRUITER
export const getApplicationsForInternship = asyncHandler(async (req, res) => {
  const { internshipId } = req.params;

  const internship = await Internship.findById(internshipId);

  if (!internship) {
    throw new ApiError(404, "Internship not found");
  }

  // Check recruiter owns this internship
  if (internship.company.toString() !== req.user.id) {
    throw new ApiError(403, "Not authorized");
  }

  const applications = await Application.find({
    internship: internshipId
  })
    .populate("student", "name email phone skills")
    .sort({ createdAt: -1 });

  res.json(
    new ApiResponse(200, applications, "Applications fetched")
  );
});


//  UPDATE APPLICATION STATUS
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  const validStatus = ["applied", "shortlisted", "rejected", "accepted"];

  if (!validStatus.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const application = await Application.findById(applicationId)
    .populate("internship");

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  // Check recruiter ownership
  if (application.internship.company.toString() !== req.user.id) {
    throw new ApiError(403, "Not authorized");
  }

  application.status = status;
  await application.save();

  res.json(
    new ApiResponse(200, application, "Status updated successfully")
  );
});