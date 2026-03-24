import Joi from "joi";

export const studentRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6)
});

export const recruiterRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6)
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const createJobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  stipend: Joi.string().required(),
  duration: Joi.string().required(),
  skillsRequired: Joi.array().items(Joi.string())
});

export const updateJobSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  location: Joi.string(),
  stipend: Joi.string(),
  duration: Joi.string(),
  skillsRequired: Joi.array().items(Joi.string())
});

export const updateStudentProfileSchema = Joi.object({
  name: Joi.string().min(3),
  skills: Joi.array().items(Joi.string()),
  education: Joi.string(),
  phone: Joi.string(),
  location: Joi.string(),
  bio: Joi.string()
});

export const updateRecruiterProfileSchema = Joi.object({
  name: Joi.string().min(3),
  companyName: Joi.string().min(2),
  companyEmail: Joi.string().email(),
  companyWebsite: Joi.string().uri(),
  phone: Joi.string(),
  location: Joi.string(),
  bio: Joi.string()
});