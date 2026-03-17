import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // recruiter/company user
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["remote", "onsite", "hybrid"],
      required: true
    },
    stipend: {
      type: String,
      default: "Unpaid"
    },
    duration: {
      type: String, // e.g. "3 months"
      required: true
    },
    skillsRequired: [
      {
        type: String
      }
    ],
    description: {
      type: String,
      required: true
    },
    openings: {
      type: Number,
      default: 1
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application"
      }
    ],
    deadline: {
      type: Date
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// 🔥 Indexes for performance
internshipSchema.index({ company: 1 });
internshipSchema.index({ title: "text", description: "text" });

export default mongoose.model("Internship", internshipSchema);