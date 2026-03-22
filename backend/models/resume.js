import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    resumeUrl: {
      type: String, // Cloudinary URL
      required: true
    },
    fileName: {
      type: String
    },
    fileType: {
      type: String, // pdf, doc, docx
      default: "pdf"
    },
    fileSize: {
      type: Number // in KB/MB (optional)
    },
    isDefault: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

//  Indexes
resumeSchema.index({ student: 1 });
resumeSchema.index({ student: 1, isDefault: 1 });

export default mongoose.model("Resume", resumeSchema);