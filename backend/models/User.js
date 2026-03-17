import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    role: {
      type: String,
      enum: ["student", "recruiter"],
      default: "student"
    },
    phone: {
      type: String,
      default: ""
    },
    profilePic: {
      type: String, // Cloudinary URL
      default: null
    },

    // 🎓 Student-specific
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill"
      }
    ],
    resumes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume"
      }
    ],

    // 🏢 Recruiter-specific
    companyName: {
      type: String,
      default: ""
    },
    companyLogo: {
      type: String,
      default: null
    },
    companyWebsite: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

// 🔥 Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

export default mongoose.model("User", userSchema);