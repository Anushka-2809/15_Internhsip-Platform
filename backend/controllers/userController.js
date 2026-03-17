import User from "../models/User.js";
import { ApiResponse, ApiError, asyncHandler } from "../utils/helpers.js";

// 👤 GET PROFILE
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate("skills")
    .populate("resumes");

  if (!user) throw new ApiError(404, "User not found");

  res.json(new ApiResponse(200, user, "Profile fetched"));
});

// ✏️ UPDATE PROFILE
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  );

  res.json(new ApiResponse(200, user, "Profile updated"));
});