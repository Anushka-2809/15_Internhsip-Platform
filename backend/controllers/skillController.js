import Skill from "../models/Skill.js";
import { ApiResponse, asyncHandler } from "../utils/helpers.js";

// ➕ CREATE
export const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);

  res.status(201).json(new ApiResponse(201, skill, "Created"));
});

// 📋 GET ALL
export const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find();

  res.json(new ApiResponse(200, skills, "Fetched"));
});