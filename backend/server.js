import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import "express-async-errors";
import connectDB from "./config/Database.js";
import errorHandler from "./middlewares/errorHandler.js";

// Import routes
import authRoutes from "./routes/AuthRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import jobRoutes from "./routes/JobRoutes.js";
import applicationRoutes from "./routes/ApplicationRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// CORS Configuration - Allow multiple local development ports
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.CORS_ORIGIN 
      ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
      : ["*"];
    
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running", status: "ok" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();
    
    // Then start the server
    app.listen(PORT, () => {
      console.log(`\n🚀 Server is running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🌍 CORS Origin: ${process.env.CORS_ORIGIN || "*"}`);
      console.log(`\n✅ API Ready: http://localhost:${PORT}/api\n`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();