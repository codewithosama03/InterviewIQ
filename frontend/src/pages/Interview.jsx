import { useState } from "react";

import {
  Brain,
  Sparkles,
  Send,
  TrendingUp,
  Target,
} from "lucide-react";

import API from "../services/api";

import InterviewCard from "../components/InterviewCard";

const Interview = () => {
  const [topic, setTopic] = useState("React");
  const [difficulty, setDifficulty] = useState("Medium");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);

  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  const generateQuestion = async () => {
    try {
      setLoading(true);
      setFeedback(null);
      setAnswer("");

      const { data } = await API.post(
        "/interview/generate",
        { topic, difficulty }
      );

      setQuestion(data.question);
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const evaluateAnswer = async () => {
    try {
      setEvaluating(true);

      const { data } = await API.post(
        "/interview/evaluate",
        {
          topic,
          difficulty,
          question,
          answer,
        }
      );

      setFeedback(data.feedback);
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">

      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative z-10 w-[80%] max-w-5xl mx-auto py-14">

        <div className="text-center mb-12">
          <div className="flex justify-center text-indigo-600 mb-4">
            <Brain size={52} />
          </div>

          <h1 className="text-4xl font-bold text-slate-900">
            AI Interview Practice
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Practice technical interviews with AI
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

          <label className="block mb-3 font-medium text-slate-700">
            Choose Topic
          </label>

          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-4 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>React</option>
            <option>JavaScript</option>
            <option>MERN</option>
            <option>Frontend Developer</option>
            <option>React Developer</option>
            <option>Full Stack Developer</option>
            <option>Backend Developer</option>
          </select>

          <label className="block mb-3 font-medium text-slate-700">
            Difficulty
          </label>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-4 border border-slate-200 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <button
            onClick={generateQuestion}
            disabled={loading}
            className="w-full bg-indigo-600 text-white rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
          >
            <Sparkles size={20} />
            {loading ? "Generating..." : "Generate Question"}
          </button>

          {question && (
            <>
              <InterviewCard question={question} />

              <div className="mt-8">

                <label className="block mb-3 font-medium text-slate-700">
                  Your Answer
                </label>

                <textarea
                  rows="7"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <button
                  onClick={evaluateAnswer}
                  disabled={evaluating || !answer}
                  className="w-full mt-4 bg-purple-600 text-white rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-purple-700 transition"
                >
                  <Send size={20} />
                  {evaluating ? "Evaluating..." : "Submit Answer"}
                </button>

              </div>
            </>
          )}

          {feedback && (
            <div className="mt-8 space-y-6">

              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 flex items-center justify-between">

                <div>
                  <h2 className="text-2xl font-bold">
                    Interview Score
                  </h2>
                  <p className="opacity-90 mt-1">
                    AI evaluation result
                  </p>
                </div>

                <div className="text-4xl font-bold">
                  {feedback.score}/10
                </div>

              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="text-indigo-600" size={24} />
                  <h3 className="text-xl font-semibold">
                    Overall Feedback
                  </h3>
                </div>

                <p>{feedback.overallFeedback}</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">

                <div className="flex items-center gap-3 mb-3">
                  <Target className="text-purple-600" size={24} />
                  <h3 className="text-xl font-semibold text-purple-700">
                    Recommended Next Topic
                  </h3>
                </div>

                <p className="text-purple-700 font-medium text-lg">
                  {feedback.recommendedTopic}
                </p>

              </div>

              <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-green-700 mb-4">
                    Strengths
                  </h3>

                  <ul className="space-y-3">
                    {feedback.strengths?.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-red-600 mb-4">
                    Weaknesses
                  </h3>

                  <ul className="space-y-3">
                    {feedback.weaknesses?.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-4">
                    Suggestions
                  </h3>

                  <ul className="space-y-3">
                    {feedback.suggestions?.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Interview;