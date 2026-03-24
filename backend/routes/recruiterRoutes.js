import express from "express";
import { authMiddleware, recruiterRole } from "../middlewares/auth.js";
import {
  createJobController,
  getJobsController,
  updateJobController,
  deleteJobController,
  getProfileController,
  updateProfileController
} from "../controllers/RecruiterController.js";

const router = express.Router();

// Profile routes - require authentication and recruiter role
router.get("/profile", authMiddleware, recruiterRole, getProfileController);
router.put("/profile/update", authMiddleware, recruiterRole, updateProfileController);

// Job routes - require authentication and recruiter role
router.post("/job/create", authMiddleware, recruiterRole, createJobController);
router.get("/jobs", authMiddleware, recruiterRole, getJobsController);
router.put("/job/:id", authMiddleware, recruiterRole, updateJobController);
router.delete("/job/:id", authMiddleware, recruiterRole, deleteJobController);

export default router;