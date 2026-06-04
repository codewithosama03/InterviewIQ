import { useState } from "react";

import API from "../services/api";

import {
  Brain,
  Sparkles,
  Send,
  Trophy,
  CheckCircle,
  AlertCircle,
  Target,
} from "lucide-react";

const MockInterview = () => {
  const [topic, setTopic] =
    useState("React");

  const [questions, setQuestions] =
    useState([]);

  const [answers, setAnswers] =
    useState([
      "",
      "",
      "",
      "",
      "",
    ]);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [report, setReport] =
    useState(null);

  const startInterview =
    async () => {
      try {
        setLoading(true);

        setReport(null);

        setQuestions([]);

        setCurrentQuestion(0);

        setAnswers([
          "",
          "",
          "",
          "",
          "",
        ]);

        const { data } =
          await API.post(
            "/mock-interview/start",
            {
              topic,
            }
          );

        setQuestions(data.questions);

      } catch (error) {
        alert(
          error.response?.data?.message ||
            "Failed to start interview"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleAnswerChange = (
    value
  ) => {
    const updated = [...answers];

    updated[currentQuestion] = value;

    setAnswers(updated);
  };

  const handleNext = () => {
    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (prev) => prev + 1
      );
    }
  };

  const submitInterview =
    async () => {
      try {
        setSubmitting(true);

        const { data } =
          await API.post(
            "/mock-interview/submit",
            {
              topic,
              questions,
              answers,
            }
          );

        setReport(data.report);

      } catch (error) {
        alert(
          error.response?.data?.message ||
            "Failed to generate report"
        );
      } finally {
        setSubmitting(false);
      }
    };

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">

      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative z-10 w-[80%] max-w-5xl mx-auto py-14">

        <div className="text-center mb-10">

          <Brain
            size={52}
            className="mx-auto text-indigo-600 mb-4"
          />

          <h1 className="text-4xl font-bold text-slate-900">
            Mock Interview
          </h1>

          <p className="text-slate-500 mt-3">
            Complete a realistic
            5-question interview
            session
          </p>

        </div>

        {!questions.length && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">

            <label className="block mb-3 font-medium">
              Select Topic
            </label>

            <select
              value={topic}
              onChange={(e) =>
                setTopic(e.target.value)
              }
              className="w-full p-4 border border-slate-200 rounded-xl mb-6"
            >
              <option>React</option>
              <option>
                JavaScript
              </option>
              <option>MERN</option>
              <option>
                Frontend
              </option>
            </select>

            <button
              onClick={startInterview}
              disabled={loading}
              className="w-full bg-indigo-600 text-white rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
            >
              <Sparkles size={20} />

              {loading
                ? "Preparing Interview..."
                : "Start Mock Interview"}
            </button>

          </div>
        )}

        {questions.length > 0 &&
          !report && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">

              <div className="flex justify-between items-center mb-6">

                <h2 className="font-semibold text-xl">
                  Question{" "}
                  {currentQuestion + 1}
                  /
                  {
                    questions.length
                  }
                </h2>

                <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl text-sm font-medium">
                  {topic}
                </span>

              </div>

              <div className="w-full bg-slate-200 rounded-full h-3 mb-8">

                <div
                  className="bg-indigo-600 h-3 rounded-full transition-all"
                  style={{
                    width: `${
                      ((currentQuestion +
                        1) /
                        questions.length) *
                      100
                    }%`,
                  }}
                />

              </div>

              <div className="bg-slate-100 rounded-xl p-5 mb-6">

                <p className="text-slate-800 leading-relaxed">
                  {
                    questions[
                      currentQuestion
                    ]
                  }
                </p>

              </div>

              <textarea
                rows={8}
                value={
                  answers[
                    currentQuestion
                  ]
                }
                onChange={(e) =>
                  handleAnswerChange(
                    e.target.value
                  )
                }
                placeholder="Write your answer here..."
                className="w-full border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {currentQuestion <
              questions.length - 1 ? (
                <button
                  onClick={
                    handleNext
                  }
                  disabled={
                    !answers[
                      currentQuestion
                    ]
                      .trim()
                  }
                  className="mt-5 w-full bg-indigo-600 text-white p-4 rounded-xl hover:bg-indigo-700 transition"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={
                    submitInterview
                  }
                  disabled={
                    submitting
                  }
                  className="mt-5 w-full bg-purple-600 text-white p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-700 transition"
                >
                  <Send size={20} />

                  {submitting
                    ? "Generating Report..."
                    : "Finish Interview"}
                </button>
              )}

            </div>
          )}

        {report && (
          <div className="space-y-6">

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold">
                  Final Score
                </h2>

                <p className="opacity-90 mt-2">
                  Mock Interview Report
                </p>

              </div>

              <div className="text-5xl font-bold">
                {report.score}/10
              </div>

            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">

              <div className="flex items-center gap-3 mb-4">

                <Trophy className="text-indigo-600" />

                <h3 className="text-xl font-semibold">
                  Overall Feedback
                </h3>

              </div>

              <p>
                {
                  report.overallFeedback
                }
              </p>

            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-3">

                <Target className="text-purple-600" />

                <h3 className="font-semibold text-lg">
                  Hiring Recommendation
                </h3>

              </div>

              <p className="text-xl font-bold text-purple-700">
                {
                  report.hiringRecommendation
                }
              </p>

            </div>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">

                <div className="flex items-center gap-2 mb-4">

                  <CheckCircle className="text-green-600" />

                  <h3 className="font-semibold text-green-700">
                    Strengths
                  </h3>

                </div>

                <ul className="space-y-3">

                  {report.strengths?.map(
                    (
                      item,
                      index
                    ) => (
                      <li
                        key={
                          index
                        }
                      >
                        • {item}
                      </li>
                    )
                  )}

                </ul>

              </div>

              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">

                <div className="flex items-center gap-2 mb-4">

                  <AlertCircle className="text-red-600" />

                  <h3 className="font-semibold text-red-700">
                    Weaknesses
                  </h3>

                </div>

                <ul className="space-y-3">

                  {report.weaknesses?.map(
                    (
                      item,
                      index
                    ) => (
                      <li
                        key={
                          index
                        }
                      >
                        • {item}
                      </li>
                    )
                  )}

                </ul>

              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">

                <h3 className="font-semibold text-indigo-700 mb-4">
                  Suggestions
                </h3>

                <ul className="space-y-3">

                  {report.suggestions?.map(
                    (
                      item,
                      index
                    ) => (
                      <li
                        key={
                          index
                        }
                      >
                        • {item}
                      </li>
                    )
                  )}

                </ul>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default MockInterview;