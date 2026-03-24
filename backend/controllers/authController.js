import Student from "../models/Student.js";
import Recruiter from "../models/Recruiter.js";
import { generateToken } from "../utils/jwt.js";
import { ApiResponse, ApiError } from "../utils/helpers.js";
import { studentRegisterSchema, recruiterRegisterSchema, loginSchema } from "../utils/validation.js";
import { asyncHandler } from "../utils/helpers.js";

export const registerStudentController = asyncHandler(async (req, res) => {
  const { error, value } = studentRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).json(
      new ApiResponse(400, null, error.details[0].message)
    );
  }

  // Check if student already exists
  const existingStudent = await Student.findOne({ email: value.email });
  if (existingStudent) {
    throw new ApiError(400, "Student with this email already exists");
  }

  // Create student
  const student = await Student.create(value);
  const token = generateToken(student._id, "student");

  res.status(201).json(
    new ApiResponse(201, { student, token }, "Student registered successfully")
  );
});

export const loginStudentController = asyncHandler(async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json(
      new ApiResponse(400, null, error.details[0].message)
    );
  }

  // Find student and validate password
  const student = await Student.findOne({ email: value.email }).select("+password");
  if (!student) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await student.comparePassword(value.password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(student._id, "student");

  res.json(
    new ApiResponse(200, { student, token }, "Student logged in successfully")
  );
});

export const registerRecruiterController = asyncHandler(async (req, res) => {
  const { error, value } = recruiterRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).json(
      new ApiResponse(400, null, error.details[0].message)
    );
  }

  // Check if recruiter already exists
  const existingRecruiter = await Recruiter.findOne({ email: value.email });
  if (existingRecruiter) {
    throw new ApiError(400, "Recruiter with this email already exists");
  }

  // Create recruiter
  const recruiter = await Recruiter.create(value);
  const token = generateToken(recruiter._id, "recruiter");

  res.status(201).json(
    new ApiResponse(201, { recruiter, token }, "Recruiter registered successfully")
  );
});

export const loginRecruiterController = asyncHandler(async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json(
      new ApiResponse(400, null, error.details[0].message)
    );
  }

  // Find recruiter and validate password
  const recruiter = await Recruiter.findOne({ email: value.email }).select("+password");
  if (!recruiter) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await recruiter.comparePassword(value.password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(recruiter._id, "recruiter");

  res.json(
    new ApiResponse(200, { recruiter, token }, "Recruiter logged in successfully")
  );
});

export const logoutController = asyncHandler(async (req, res) => {
  // Token is usually invalidated on the client side (frontend removes it from localStorage)
  // Optional: Implement token blacklist on the backend for stricter control
  res.json(new ApiResponse(200, null, "Logged out successfully"));
});

export default {
  registerStudentController,
  loginStudentController,
  registerRecruiterController,
  loginRecruiterController,
  logoutController
};