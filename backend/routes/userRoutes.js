import express from "express";
import {
  getProfile,
  updateProfile
} from "../controllers/userController.js";

import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// Get logged-in user profile
router.get("/me", authMiddleware, getProfile);

// Update profile
router.put("/me", authMiddleware, updateProfile);

export default router;