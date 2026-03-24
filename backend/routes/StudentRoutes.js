
import express from "express";
import { authMiddleware, studentRole } from "../middlewares/auth.js";
import { uploadResume } from "../middlewares/upload.js";
import {
  getProfileController,
  updateProfileController,
  uploadResumeController
} from "../controllers/studentController.js";

const router = express.Router();

// Protected routes - require authentication and student role
router.get("/profile", authMiddleware, studentRole, getProfileController);
router.put("/profile/update", authMiddleware, studentRole, updateProfileController);
router.post("/upload-resume", authMiddleware, studentRole, uploadResume.single("resume"), uploadResumeController);

export default router;
