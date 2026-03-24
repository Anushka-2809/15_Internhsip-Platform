import express from "express";
import { authMiddleware, studentRole, recruiterRole } from "../middlewares/auth.js";
import {
  applyForJobController,
  getStudentApplicationsController,
  getRecruiterApplicationsController,
  updateApplicationStatusController
} from "../controllers/ApplicationController.js";

const router = express.Router();

// Student applies for a job
router.post("/apply/:jobId", authMiddleware, studentRole, applyForJobController);

// Get student's applications
router.get("/student", authMiddleware, studentRole, getStudentApplicationsController);

// Get applications for a specific job (recruiter)
router.get("/recruiter/:jobId", authMiddleware, recruiterRole, getRecruiterApplicationsController);

// Update application status (recruiter)
router.put("/status/:id", authMiddleware, recruiterRole, updateApplicationStatusController);

export default router;