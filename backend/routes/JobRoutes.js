import express from "express";
import {
  getJobsController,
  getJobByIdController,
  searchJobsController,
  filterJobsController
} from "../controllers/JobController.js";

const router = express.Router();

// Public routes - no authentication required
router.get("/", getJobsController);
router.get("/search", searchJobsController);
router.get("/filter", filterJobsController);
router.get("/:id", getJobByIdController);

export default router;