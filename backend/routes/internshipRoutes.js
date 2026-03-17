import express from "express";
import {
  createInternship,
  getInternships,
  getInternshipById,
  deleteInternship
} from "../controllers/internshipController.js";

import {
  authMiddleware,
  recruiterRole
} from "../middlewares/auth.js";

const router = express.Router();

// Public
router.get("/", getInternships);
router.get("/:id", getInternshipById);

// Recruiter only
router.post("/", authMiddleware, recruiterRole, createInternship);
router.delete("/:id", authMiddleware, recruiterRole, deleteInternship);

export default router;