import Internship from "../models/Internship.js";
import { ApiResponse, ApiError, asyncHandler } from "../utils/helpers.js";

// 🧑‍💼 CREATE
export const createInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.create({
    ...req.body,
    company: req.user.id
  });

  res.status(201).json(new ApiResponse(201, internship, "Created"));
});

// 📋 GET ALL
export const getInternships = asyncHandler(async (req, res) => {
  const internships = await Internship.find().sort({ createdAt: -1 });

  res.json(new ApiResponse(200, internships, "Fetched"));
});

// 🔍 GET ONE
export const getInternshipById = asyncHandler(async (req, res) => {
  const internship = await Internship.findById(req.params.id);

  if (!internship) throw new ApiError(404, "Not found");

  res.json(new ApiResponse(200, internship, "Fetched"));
});

// ❌ DELETE
export const deleteInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.findById(req.params.id);

  if (!internship) throw new ApiError(404, "Not found");

  if (internship.company.toString() !== req.user.id) {
    throw new ApiError(403, "Not authorized");
  }

  await internship.deleteOne();

  res.json(new ApiResponse(200, null, "Deleted"));
});