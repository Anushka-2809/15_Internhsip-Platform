import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    category: {
      type: String, // e.g. "Frontend", "Backend", "Database"
      default: "General"
    },
    description: {
      type: String,
      default: ""
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

//  Indexes
skillSchema.index({ name: 1 });
skillSchema.index({ category: 1 });

export default mongoose.model("Skill", skillSchema);