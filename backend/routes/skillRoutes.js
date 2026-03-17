import express from "express";
import {
  createSkill,
  getSkills
} from "../controllers/skillController.js";

import { authMiddleware, recruiterRole } from "../middlewares/auth.js";

const router = express.Router();

// Get all skills (public)
router.get("/", getSkills);

// Create skill (optional: restrict to recruiter/admin)
router.post("/", authMiddleware, recruiterRole, createSkill);

export default router;