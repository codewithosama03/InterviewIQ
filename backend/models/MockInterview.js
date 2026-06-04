import mongoose from "mongoose";

const mockInterviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    questions: [
      {
        type: String,
      },
    ],

    answers: [
      {
        type: String,
      },
    ],

    score: {
      type: Number,
      default: 0,
    },

    report: {
      strengths: [String],

      weaknesses: [String],

      suggestions: [String],

      overallFeedback: {
        type: String,
        default: "",
      },

      hiringRecommendation: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

const MockInterview = mongoose.model(
  "MockInterview",
  mockInterviewSchema
);

export default MockInterview;

