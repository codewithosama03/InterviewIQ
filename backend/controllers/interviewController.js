import Groq from "groq-sdk";
import Interview from "../models/Interview.js";
export const generateQuestion = async (req, res) => {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { topic, difficulty } = req.body;

    if (!topic) {
      return res.status(400).json({
        message: "Topic is required",
      });
    }

    const prompt = `
Generate ONE professional interview question.

Topic:
${topic}

Difficulty:
${difficulty || "Medium"}

Rules:

- Easy = beginner level
- Medium = intermediate level
- Hard = advanced interview level

Return only the question text.
`;

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    const question =
      completion.choices[0].message.content;

    res.status(200).json({
      question,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const evaluateAnswer = async (req, res) => {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const {
      topic,
      difficulty,
      question,
      answer,
    } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        message: "Question and answer required",
      });
    }

const prompt = `
You are a professional technical interviewer.

Interview Topic:
${topic}

Difficulty Level:
${difficulty || "Medium"}

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate according to the selected difficulty level.

Return ONLY valid JSON.

Format:

{
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "overallFeedback": "",
  "recommendedTopic": ""
}

Rules:

- score must be between 1 and 10
- strengths must contain 2-4 points
- weaknesses must contain 2-4 points
- suggestions must contain 2-4 points
- overallFeedback should be a short paragraph
- recommendedTopic should be a single topic to improve next

Return JSON only.
`;

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    const aiResponse =
      completion.choices[0].message.content;

    const parsedFeedback =
      JSON.parse(aiResponse);

    const savedInterview =
      await Interview.create({
        user: req.user._id,
        topic,
        question,
        answer,

        score: parsedFeedback.score,

        feedback: {
          strengths:
            parsedFeedback.strengths,

          weaknesses:
            parsedFeedback.weaknesses,

          suggestions:
            parsedFeedback.suggestions,

          overallFeedback:
            parsedFeedback.overallFeedback,

          recommendedTopic:
            parsedFeedback.recommendedTopic,
        },
      });

    res.status(200).json({
      feedback: parsedFeedback,
      savedInterview,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getInterviewHistory = async (
  req,
  res
) => {
  try {
    const interviews =
      await Interview.find({
        user: req.user._id,
      }).sort({ createdAt: -1 });

    res.status(200).json(interviews);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getDashboardStats = async (
  req,
  res
) => {
  try {
    
    // TOTAL INTERVIEWS
    const totalInterviews =
      await Interview.countDocuments({
        user: req.user._id,
      });

    // AVERAGE SCORE
    const averageResult =
      await Interview.aggregate([
        {
          $match: {
            user: req.user._id,
          },
        },
        {
          $group: {
            _id: null,
            averageScore: {
              $avg: "$score",
            },
          },
        },
      ]);

  const averageScore =
  averageResult.length > 0 &&
  averageResult[0].averageScore !== null
    ? averageResult[0].averageScore.toFixed(1)
    : 0;

    // LATEST INTERVIEW
    const latestInterview =
      await Interview.findOne({
        user: req.user._id,
      }).sort({ createdAt: -1 });

    // BEST TOPIC
    const topicStats =
      await Interview.aggregate([
        {
          $match: {
            user: req.user._id,
          },
        },
        {
          $group: {
            _id: "$topic",

            averageScore: {
              $avg: "$score",
            },
          },
        },
        {
          $sort: {
            averageScore: -1,
          },
        },
        {
          $limit: 1,
        },
      ]);

    const bestTopic =
      topicStats.length > 0
        ? topicStats[0]._id
        : "N/A";

    res.status(200).json({
      totalInterviews,
      averageScore,
      latestScore:
        latestInterview?.score || 0,
      bestTopic,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getAnalyticsData = async (
  req,
  res
) => {
  try {
    // SCORE HISTORY
    const scoreHistory =
      await Interview.find({
        user: req.user._id,
      })
        .sort({ createdAt: 1 })
        .select("score topic createdAt");

    // TOPIC PERFORMANCE
    const topicPerformance =
      await Interview.aggregate([
        {
          $match: {
            user: req.user._id,
          },
        },
        {
          $group: {
            _id: "$topic",

            averageScore: {
              $avg: "$score",
            },

            totalInterviews: {
              $sum: 1,
            },
          },
        },
      ]);

    // RECENT INTERVIEWS
    const recentInterviews =
      await Interview.find({
        user: req.user._id,
      })
        .sort({ createdAt: -1 })
        .limit(5);

    res.status(200).json({
      scoreHistory,
      topicPerformance,
      recentInterviews,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};