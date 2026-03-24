import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { ApiResponse, ApiError } from "../utils/helpers.js";
import { asyncHandler } from "../utils/helpers.js";

export const applyForJobController = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const resumeUrl = req.body.resumeUrl || req.file?.path;

  // Check if job exists
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // Check if already applied
  const existingApplication = await Application.findOne({
    student: req.user.id,
    job: jobId
  });

  if (existingApplication) {
    throw new ApiError(400, "You have already applied for this job");
  }

  // Create application
  const application = await Application.create({
    student: req.user.id,
    job: jobId,
    resumeUrl
  });

  // Update job applications count
  job.applicationsCount += 1;
  await job.save();

  res.status(201).json(
    new ApiResponse(201, application, "Application submitted successfully")
  );
});

export const getStudentApplicationsController = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const applications = await Application.find({ student: req.user.id })
    .populate("job", "title companyName location stipend")
    .skip(skip)
    .limit(limit)
    .sort({ appliedAt: -1 });

  const total = await Application.countDocuments({ student: req.user.id });

  res.json(
    new ApiResponse(200, { applications, total, pages: Math.ceil(total / limit), currentPage: page }, "Applications retrieved successfully")
  );
});

export const getRecruiterApplicationsController = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  // Verify job belongs to recruiter
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  if (job.recruiter.toString() !== req.user.id) {
    throw new ApiError(403, "Not authorized to view applications for this job");
  }

  const applications = await Application.find({ job: jobId })
    .populate("student", "name email skills phone")
    .skip(skip)
    .limit(limit)
    .sort({ appliedAt: -1 });

  const total = await Application.countDocuments({ job: jobId });

  res.json(
    new ApiResponse(200, { applications, total, pages: Math.ceil(total / limit), currentPage: page }, "Applications retrieved successfully")
  );
});

export const updateApplicationStatusController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["applied", "shortlisted", "rejected", "accepted"].includes(status)) {
    return res.status(400).json(
      new ApiResponse(400, null, "Invalid status")
    );
  }

  const application = await Application.findById(id).populate("job");

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  if (application.job.recruiter.toString() !== req.user.id) {
    throw new ApiError(403, "Not authorized to update this application");
  }

  application.status = status;
  await application.save();

  res.json(
    new ApiResponse(200, application, "Application status updated successfully")
  );
});

export default {
  applyForJobController,
  getStudentApplicationsController,
  getRecruiterApplicationsController,
  updateApplicationStatusController
};