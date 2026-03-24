import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/Cloudinary.js";
import { ApiError } from "../utils/helpers.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "internship-platform/resumes",
    resource_type: "auto",
    allowed_formats: ["pdf"]
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only PDF files
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only PDF files are allowed"), false);
  }
};

export const uploadResume = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

export default uploadResume;