import Groq from "groq-sdk";
import MockInterview from "../models/MockInterview.js";

export const startMockInterview = async (
  req,
  res
) => {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { topic } = req.body;

    const prompt = `
Generate exactly 5 professional interview questions for ${topic}.

Return ONLY valid JSON.

{
  "questions": [
    "",
    "",
    "",
    "",
    ""
  ]
}
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

    const rawResponse =
      completion.choices[0].message.content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const parsed =
      JSON.parse(rawResponse);

    res.status(200).json(parsed);

  } catch (error) {
    console.log(
      "START MOCK ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

export const submitMockInterview =
  async (req, res) => {
    try {
      const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY,
      });

      const {
        topic,
        questions,
        answers,
      } = req.body;

      const prompt = `
You are a senior technical interviewer.

Interview Topic:
${topic}

Questions:
${JSON.stringify(questions)}

Candidate Answers:
${JSON.stringify(answers)}

Return ONLY valid JSON.

{
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "overallFeedback": "",
  "hiringRecommendation": ""
}

Rules:

- score must be between 1 and 10
- strengths must contain 3-5 points
- weaknesses must contain 3-5 points
- suggestions must contain 3-5 points
- overallFeedback should be a short paragraph
- hiringRecommendation must be one of:
"Hire"
"Consider"
"Reject"

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

      const rawResponse =
        completion.choices[0].message.content
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      console.log(
        "MOCK REPORT RAW RESPONSE:"
      );
      console.log(rawResponse);

      const report =
        JSON.parse(rawResponse);

      const savedInterview =
        await MockInterview.create({
          user: req.user._id,

          topic,

          questions,

          answers,

          score: report.score,

          report: {
            strengths:
              report.strengths || [],

            weaknesses:
              report.weaknesses || [],

            suggestions:
              report.suggestions || [],

            overallFeedback:
              report.overallFeedback ||
              "",

            hiringRecommendation:
              report.hiringRecommendation ||
              "Consider",
          },
        });

      res.status(200).json({
        report,
        savedInterview,
      });

    } catch (error) {
      console.log(
        "SUBMIT MOCK ERROR:"
      );

      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getMockHistory =
  async (req, res) => {
    try {
      const interviews =
        await MockInterview.find({
          user: req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json(
        interviews
      );

    } catch (error) {
      console.log(
        "GET MOCK HISTORY ERROR:"
      );

      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  };