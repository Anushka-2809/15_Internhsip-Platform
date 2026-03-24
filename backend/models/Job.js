import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    description: {
      type: String,
      required: true
    },

    companyName: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    stipend: {
      type: String,
      required: true
    },

    duration: {
      type: String,
      required: true
    },

    skillsRequired: [
      {
        type: String,
        trim: true,
        index: true
      }
    ],

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    applicationsCount: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    },

    deadline: {
      type: Date
    }

  },
  {
    timestamps: true
  }
);


// 🔥 Compound index (for search optimization)
jobSchema.index({ title: "text", description: "text", skillsRequired: "text" });


// 🔥 Virtual field (optional)
jobSchema.virtual("isExpired").get(function () {
  return this.deadline ? this.deadline < new Date() : false;
});


// 🔥 Pre-save hook (optional example)
jobSchema.pre("save", function (next) {
  if (this.deadline && this.deadline < new Date()) {
    this.isActive = false;
  }
  next();
});


export default mongoose.model("Job", jobSchema);