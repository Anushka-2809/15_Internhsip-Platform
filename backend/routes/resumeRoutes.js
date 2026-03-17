import express from "express";
import {
  uploadResume,
  getMyResumes
} from "../controllers/resumeController.js";

import { authMiddleware, studentRole } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// Upload resume
router.post(
  "/upload",
  authMiddleware,
  studentRole,
  upload.single("resume"),
  uploadResume
);

// Get my resumes
router.get(
  "/my",
  authMiddleware,
  studentRole,
  getMyResumes
);

export default router;