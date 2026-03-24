import Job from "../models/Job.js";
import { ApiResponse, ApiError } from "../utils/helpers.js";
import { asyncHandler } from "../utils/helpers.js";

export const getJobsController = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const jobs = await Job.find()
    .populate("recruiter", "name companyName")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Job.countDocuments();

  res.json(
    new ApiResponse(200, { jobs, total, pages: Math.ceil(total / limit), currentPage: page }, "Jobs retrieved successfully")
  );
});

export const getJobByIdController = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate("recruiter");

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  res.json(
    new ApiResponse(200, job, "Job retrieved successfully")
  );
});

export const searchJobsController = asyncHandler(async (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;

  if (!q) {
    return res.status(400).json(
      new ApiResponse(400, null, "Search query is required")
    );
  }

  const skip = (page - 1) * limit;

  const jobs = await Job.find({
    $text: { $search: q }
  })
    .populate("recruiter", "name companyName")
    .skip(skip)
    .limit(limit);

  const total = await Job.countDocuments({
    $text: { $search: q }
  });

  res.json(
    new ApiResponse(200, { jobs, total, pages: Math.ceil(total / limit), currentPage: page }, "Search results retrieved successfully")
  );
});

export const filterJobsController = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, location, minStipend, maxStipend, skills } = req.query;
  const skip = (page - 1) * limit;

  const query = {};

  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  if (minStipend || maxStipend) {
    query.stipend = {
      $regex: minStipend || "",
      $options: "i"
    };
  }

  if (skills) {
    const skillsArray = skills.split(",");
    query.skillsRequired = { $in: skillsArray };
  }

  const jobs = await Job.find(query)
    .populate("recruiter", "name companyName")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Job.countDocuments(query);

  res.json(
    new ApiResponse(200, { jobs, total, pages: Math.ceil(total / limit), currentPage: page }, "Filtered jobs retrieved successfully")
  );
});

export default {
  getJobsController,
  getJobByIdController,
  searchJobsController,
  filterJobsController
};