import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  startMockInterview,
  submitMockInterview,
  getMockHistory,
} from "../controllers/mockInterviewController.js";

const router = express.Router();

router.post(
  "/start",
  protect,
  startMockInterview
);

router.post(
  "/submit",
  protect,
  submitMockInterview
);

router.get(
  "/history",
  protect,
  getMockHistory
);

export default router;