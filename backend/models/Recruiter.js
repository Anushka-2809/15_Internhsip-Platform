import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    companyLogo: {
      type: String, // Cloudinary URL
      default: null
    },
    companyWebsite: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      default: "recruiter"
    },
    internshipsPosted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Internship"
      }
    ]
  },
  { timestamps: true }
);

// 🔥 Indexes
recruiterSchema.index({ email: 1 });
recruiterSchema.index({ companyName: "text" });

export default mongoose.model("Recruiter", recruiterSchema);