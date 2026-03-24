import Student from "../models/Student.js";
import { ApiResponse, ApiError } from "../utils/helpers.js";
import { updateStudentProfileSchema } from "../utils/validation.js";
import { asyncHandler } from "../utils/helpers.js";

export const getProfileController = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.user.id);
  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  res.json(
    new ApiResponse(200, student, "Profile retrieved successfully")
  );
});

export const updateProfileController = asyncHandler(async (req, res) => {
  const { error, value } = updateStudentProfileSchema.validate(req.body);
  if (error) {
    return res.status(400).json(
      new ApiResponse(400, null, error.details[0].message)
    );
  }

  const student = await Student.findByIdAndUpdate(req.user.id, value, {
    new: true,
    runValidators: true
  });

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  res.json(
    new ApiResponse(200, student, "Profile updated successfully")
  );
});

export const uploadResumeController = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json(
      new ApiResponse(400, null, "No file uploaded")
    );
  }

  const resumeUrl = req.file.path; // Cloudinary URL

  const student = await Student.findByIdAndUpdate(
    req.user.id,
    { resumeUrl },
    { new: true }
  );

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  res.json(
    new ApiResponse(200, student, "Resume uploaded successfully")
  );
});

export const getAppliedJobsController = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  // This is handled by application controller
  res.json(
    new ApiResponse(200, null, "Use /applications/student endpoint")
  );
});

export default {
  getProfileController,
  updateProfileController,
  uploadResumeController,
  getAppliedJobsController
};