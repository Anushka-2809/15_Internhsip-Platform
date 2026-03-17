import { ApiError, ApiResponse } from "../utils/helpers.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
    return res
      .status(400)
      .json(new ApiResponse(400, null, messages));
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res
      .status(400)
      .json(new ApiResponse(400, null, `${field} already exists`));
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Invalid token"));
  }

  if (err.name === "TokenExpiredError") {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Token expired"));
  }

  // Custom API errors
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json(new ApiResponse(err.statusCode, null, err.message));
  }

  // Default error
  res
    .status(err.statusCode || 500)
    .json(
      new ApiResponse(
        err.statusCode || 500,
        null,
        err.message || "Internal server error"
      )
    );
};

export default errorHandler;