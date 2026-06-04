import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import mockInterviewRoutes from "./routes/mockInterviewRoutes.js";

import resumeRoutes from "./routes/resumeRoutes.js";

// calling Ai (GROQ)
import interviewRoutes from "./routes/interviewRoutes.js";

dotenv.config();
connectDB();

console.log("GROQ:", process.env.GROQ_API_KEY);
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/interview", interviewRoutes);

// mock interview
app.use("/api/mock-interview",mockInterviewRoutes);

// reusume
app.use("/api/resume",resumeRoutes );

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("server running");
});