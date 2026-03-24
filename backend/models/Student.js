import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false
    },
    skills: {
      type: [String],
      default: []
    },
    education: {
      type: String,
      default: null
    },
    resumeUrl: {
      type: String,
      default: null
    },
    phone: {
      type: String,
      default: null
    },
    location: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

// Hash password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
studentSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Remove password from response
studentSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("Student", studentSchema);