import { useEffect, useState } from "react";

import {
  Brain,
  CalendarDays,
} from "lucide-react";

import API from "../services/api";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await API.get(
        "/interview/history"
      );

      setHistory(data);

    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">

      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative z-10 w-[80%] max-w-6xl mx-auto py-14">

        <div className="text-center mb-12">

          <div className="flex justify-center text-indigo-600 mb-4">
            <Brain size={52} />
          </div>

          <h1 className="text-4xl font-bold text-slate-900">
            Interview History
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Review your previous AI interviews
          </p>

        </div>

        {loading ? (
          <div className="text-center text-slate-500">
            Loading history...
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-10 text-center">

            <h2 className="text-2xl font-semibold text-slate-700 mb-3">
              No Interviews Yet
            </h2>

            <p className="text-slate-500">
              Start practicing to build your interview history.
            </p>

          </div>
        ) : (
          <div className="grid gap-6">

            {history.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8"
              >

                <div className="flex items-center justify-between mb-6">

                  <div>
                    <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
                      {item.topic}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 text-sm">

                    <CalendarDays size={18} />

                    <span>
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </span>

                  </div>
                </div>

                <div className="mb-6">

                  <h2 className="text-xl font-semibold text-slate-800 mb-3">
                    Question
                  </h2>

                  <p className="text-slate-600 leading-relaxed">
                    {item.question}
                  </p>

                </div>

                <div className="mb-6">

                  <h2 className="text-xl font-semibold text-slate-800 mb-3">
                    Your Answer
                  </h2>

                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {item.answer}
                  </p>

                </div>

             <div className="bg-slate-100 rounded-2xl p-6">

  <h2 className="text-xl font-semibold text-purple-700 mb-4">
    AI Feedback
  </h2>

  {typeof item.feedback === "string" ? (
    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
      {item.feedback}
    </p>
  ) : (
    <div className="space-y-5">

      <div>
        <h3 className="font-semibold text-indigo-600 mb-2">
          Overall Feedback
        </h3>

        <p className="text-slate-700">
          {item.feedback?.overallFeedback}
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-purple-600 mb-2">
          Recommended Topic
        </h3>

        <p className="text-slate-700">
          {item.feedback?.recommendedTopic}
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-green-600 mb-2">
          Strengths
        </h3>

        <ul className="space-y-1 text-slate-700">
          {item.feedback?.strengths?.map(
            (strength, index) => (
              <li key={index}>
                • {strength}
              </li>
            )
          )}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-red-500 mb-2">
          Weaknesses
        </h3>

        <ul className="space-y-1 text-slate-700">
          {item.feedback?.weaknesses?.map(
            (weakness, index) => (
              <li key={index}>
                • {weakness}
              </li>
            )
          )}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-indigo-600 mb-2">
          Suggestions
        </h3>

        <ul className="space-y-1 text-slate-700">
          {item.feedback?.suggestions?.map(
            (suggestion, index) => (
              <li key={index}>
                • {suggestion}
              </li>
            )
          )}
        </ul>
      </div>

    </div>
  )}

</div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default History;