import jwt from "jsonwebtoken";
import { ApiError } from "../utils/helpers.js";

// 🔐 AUTH MIDDLEWARE (verify token)
export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if header exists and starts with Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "No token provided");
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new ApiError(401, "Invalid or expired token");
    }

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    next(new ApiError(401, "Unauthorized access"));
  }
};



// 🎓 STUDENT ONLY
export const studentRole = (req, res, next) => {
  if (req.user.role !== "student") {
    return next(new ApiError(403, "Only students can access this route"));
  }
  next();
};



// 🧑‍💼 RECRUITER ONLY
export const recruiterRole = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return next(new ApiError(403, "Only recruiters can access this route"));
  }
  next();
};



// 🔥 OPTIONAL: ADMIN (future use)
export const adminRole = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ApiError(403, "Only admins can access this route"));
  }
  next();
};