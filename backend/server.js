import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import "express-async-errors";

import connectDB from "./config/database.js";
import errorHandler from "./middlewares/errorHandler.js";

// ✅ Routes (updated for your structure)
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// 🔥 CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map(o => o.trim())
    : "*",
  credentials: true,
};


// 🔹 MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 🔹 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/skills", skillRoutes);


// 🔹 HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running 🚀"
  });
});


// 🔹 404 HANDLER
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


// 🔹 ERROR HANDLER (IMPORTANT: LAST)
app.use(errorHandler);


// 🔥 START SERVER
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}`);
      console.log(`🌍 Mode: ${process.env.NODE_ENV || "development"}`);
      console.log(`🔗 API: http://localhost:${PORT}/api\n`);
    });

  } catch (error) {
    console.error("❌ Server start failed:", error.message);
    process.exit(1);
  }
};

startServer();