import express from "express";

import {
  generateQuestion,
  evaluateAnswer,
  getInterviewHistory,
  getDashboardStats,
  getAnalyticsData,
} from "../controllers/interviewController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  generateQuestion
);

router.post(
  "/evaluate",
  protect,
  evaluateAnswer
);

router.get(
  "/history",
  protect,
  getInterviewHistory
);

router.get(
  "/stats",
  protect,
  getDashboardStats
);

router.get(
  "/analytics",
  protect,
  getAnalyticsData
);


export default router;