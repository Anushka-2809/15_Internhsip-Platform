import express from "express";
import {
  registerStudentController,
  loginStudentController,
  registerRecruiterController,
  loginRecruiterController,
  logoutController
} from "../controllers/AuthController.js";

const router = express.Router();

// Student Routes
router.post("/student/register", registerStudentController);
router.post("/student/login", loginStudentController);

// Recruiter Routes
router.post("/recruiter/register", registerRecruiterController);
router.post("/recruiter/login", loginRecruiterController);

// Logout
router.post("/logout", logoutController);

export default router;