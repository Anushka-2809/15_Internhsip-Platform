import Resume from "../models/Resume.js";
import { ApiResponse, ApiError, asyncHandler } from "../utils/helpers.js";

// UPLOAD
export const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "No file uploaded");

  const resume = await Resume.create({
    student: req.user.id,
    resumeUrl: req.file.path,
    fileName: req.file.originalname
  });

  res.status(201).json(new ApiResponse(201, resume, "Uploaded"));
});

// GET ALL
export const getMyResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ student: req.user.id });

  res.json(new ApiResponse(200, resumes, "Fetched"));
});