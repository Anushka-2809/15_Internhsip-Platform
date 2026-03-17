import express from "express";
import { getMyInternships } from "../controllers/recruiterController.js";
import { authMiddleware, recruiterRole } from "../middlewares/auth.js";

const router = express.Router();

// Get all internships posted by recruiter
router.get("/internships", authMiddleware, recruiterRole, getMyInternships);

export default router;