import Job from "../models/Job.js";
import Recruiter from "../models/Recruiter.js";
import { ApiResponse, ApiError } from "../utils/helpers.js";
import { createJobSchema, updateJobSchema, updateRecruiterProfileSchema } from "../utils/validation.js";
import { asyncHandler } from "../utils/helpers.js";

export const createJobController = asyncHandler(async (req, res) => {
  const { error, value } = createJobSchema.validate(req.body);
  if (error) {
    return res.status(400).json(
      new ApiResponse(400, null, error.details[0].message)
    );
  }

  // Get recruiter details to auto-fill company name if not provided
  const recruiter = await Recruiter.findById(req.user.id);
  if (!recruiter) {
    throw new ApiError(404, "Recruiter not found");
  }

  const job = await Job.create({
    ...value,
    companyName: value.companyName || recruiter.companyName || "Company",
    recruiter: req.user.id
  });

  res.status(201).json(
    new ApiResponse(201, job, "Job created successfully")
  );
});

export const getJobsController = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const jobs = await Job.find({ recruiter: req.user.id })
    .populate({
      path: "recruiter",
      select: "name companyName email"
    })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Job.countDocuments({ recruiter: req.user.id });

  res.json(
    new ApiResponse(200, { jobs, total, pages: Math.ceil(total / limit), currentPage: page }, "Jobs retrieved successfully")
  );
});

export const updateJobController = asyncHandler(async (req, res) => {
  const { error, value } = updateJobSchema.validate(req.body);
  if (error) {
    return res.status(400).json(
      new ApiResponse(400, null, error.details[0].message)
    );
  }

  const job = await Job.findById(req.params.id);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  if (job.recruiter.toString() !== req.user.id) {
    throw new ApiError(403, "Not authorized to update this job");
  }

  Object.assign(job, value);
  await job.save();

  res.json(
    new ApiResponse(200, job, "Job updated successfully")
  );
});

export const deleteJobController = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  if (job.recruiter.toString() !== req.user.id) {
    throw new ApiError(403, "Not authorized to delete this job");
  }

  await Job.findByIdAndDelete(req.params.id);

  res.json(
    new ApiResponse(200, { message: "Job deleted successfully" }, "Job deleted successfully")
  );
});

export const getProfileController = asyncHandler(async (req, res) => {
  const recruiter = await Recruiter.findById(req.user.id).select("-password");

  if (!recruiter) {
    throw new ApiError(404, "Recruiter not found");
  }

  res.json(
    new ApiResponse(200, recruiter, "Profile retrieved successfully")
  );
});

export const updateProfileController = asyncHandler(async (req, res) => {
  const { error, value } = updateRecruiterProfileSchema.validate(req.body);
  if (error) {
    return res.status(400).json(
      new ApiResponse(400, null, error.details[0].message)
    );
  }

  const recruiter = await Recruiter.findByIdAndUpdate(req.user.id, value, {
    new: true,
    runValidators: true
  }).select("-password");

  if (!recruiter) {
    throw new ApiError(404, "Recruiter not found");
  }

  res.json(
    new ApiResponse(200, recruiter, "Profile updated successfully")
  );
});

export default {
  createJobController,
  getJobsController,
  updateJobController,
  deleteJobController,
  getProfileController,
  updateProfileController
};