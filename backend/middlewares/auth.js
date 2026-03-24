import { verifyToken } from "../utils/jwt.js";
import { ApiError } from "../utils/helpers.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "No token provided");
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      throw new ApiError(401, "Invalid or expired token");
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export const studentRole = (req, res, next) => {
  if (req.user.role !== "student") {
    return next(new ApiError(403, "Only students can access this route"));
  }
  next();
};

export const recruiterRole = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return next(new ApiError(403, "Only recruiters can access this route"));
  }
  next();
};

export default { authMiddleware, studentRole, recruiterRole };