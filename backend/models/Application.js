import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true
    },
    resumeUrl: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected", "accepted"],
      default: "applied"
    }
  },
  { timestamps: true }
);

// Prevent duplicate applications
applicationSchema.index({ student: 1, internship: 1 }, { unique: true });

export default mongoose.model("Application", applicationSchema);