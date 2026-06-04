import { useEffect, useState } from "react";

import API from "../services/api";

import {
  Brain,
  BarChart3,
  TrendingUp,
  Trophy,
  Sparkles,
  Activity,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalInterviews: 0,
    averageScore: 0,
    latestScore: 0,
    bestTopic: "N/A",
  });

  const [analytics, setAnalytics] =
    useState({
      scoreHistory: [],
      topicPerformance: [],
      recentInterviews: [],
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData =
    async () => {
      try {
        const statsResponse =
          await API.get(
            "/interview/stats"
          );

        const analyticsResponse =
          await API.get(
            "/interview/analytics"
          );

        setStats(statsResponse.data);

        setAnalytics(
          analyticsResponse.data
        );

      } catch (error) {
        alert(
          error.response?.data?.message
        );
      } finally {
        setLoading(false);
      }
    };

  const analyticsCards = [
    {
      title: "Total Interviews",
      value: stats.totalInterviews,
      icon: Brain,
      bg: "bg-indigo-100",
      text: "text-indigo-600",
    },

    {
      title: "Average Score",
      value: stats.averageScore,
      icon: TrendingUp,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },

    {
      title: "Latest Score",
      value: stats.latestScore,
      icon: BarChart3,
      bg: "bg-green-100",
      text: "text-green-600",
    },

    {
      title: "Best Topic",
      value: stats.bestTopic,
      icon: Trophy,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
  ];

  const scoreChartData =
    analytics.scoreHistory.map(
      (item, index) => ({
        interview: index + 1,
        score: item.score,
      })
    );

const topicChartData =
  analytics.topicPerformance.map((item) => ({
    topic: item._id || "Unknown",
    averageScore: Number(item.averageScore?.toFixed(1) || 0),
  }));

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">

      {/* BACKGROUND BLOBS */}

      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative z-10 w-[80%] max-w-6xl mx-auto py-14">

        {/* HEADER */}

        <div className="text-center mb-14">

          <div className="flex justify-center text-indigo-600 mb-4">
            <Sparkles size={52} />
          </div>

          <h1 className="text-4xl font-bold text-slate-900">
            Analytics Dashboard
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Track your AI interview performance
          </p>

        </div>

        {loading ? (
          <div className="text-center text-slate-500">
            Loading dashboard...
          </div>
        ) : (
          <>
            {/* ANALYTICS CARDS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

              {analyticsCards.map(
                (card, index) => {
                  const Icon = card.icon;

                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition"
                    >

                      <div className="flex items-center justify-between mb-5">

                        <div
                          className={`${card.bg} p-4 rounded-2xl`}
                        >
                          <Icon
                            className={card.text}
                            size={28}
                          />
                        </div>

                      </div>

                      <h2 className="text-slate-500 text-sm mb-2">
                        {card.title}
                      </h2>

                      <p className="text-3xl font-bold text-slate-800">
                        {card.value}
                      </p>

                    </div>
                  );
                }
              )}

            </div>

            {/* CHARTS */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

              {/* SCORE TREND */}

              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">

                <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                  Performance Trend
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >

                  <LineChart
                    data={scoreChartData}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis dataKey="interview" />

                    <YAxis />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#4f46e5"
                      strokeWidth={3}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

              {/* TOPIC PERFORMANCE */}

              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">

                <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                  Topic Performance
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >

                  <BarChart
                    data={topicChartData}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                 <XAxis
  dataKey="topic"
  tick={{ fontSize: 12 }}
  interval={0}
  angle={-15}
  textAnchor="end"
/>

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="averageScore"
                      fill="#7c3aed"
                      radius={[8, 8, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* RECENT ACTIVITY */}

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

              <div className="flex items-center gap-3 mb-8">

                <Activity
                  className="text-indigo-600"
                  size={28}
                />

                <h2 className="text-2xl font-semibold text-slate-800">
                  Recent Activity
                </h2>

              </div>

              {analytics.recentInterviews
                .length === 0 ? (
                <p className="text-slate-500">
                  No recent interviews found.
                </p>
              ) : (
                <div className="space-y-5">

                  {analytics.recentInterviews.map(
                    (item) => (
                      <div
                        key={item._id}
                        className="border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                      >

                        <div>

                          <div className="flex items-center gap-3 mb-2">

                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                              {item.topic}
                            </span>

                            <span className="text-slate-500 text-sm">
                              {new Date(
                                item.createdAt
                              ).toLocaleDateString()}
                            </span>

                          </div>

                          <p className="text-slate-700 font-medium">
                            Interview completed
                          </p>

                        </div>

                        <div className="text-2xl font-bold text-purple-600">
                          {item.score}/10
                        </div>

                      </div>
                    )
                  )}

                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Dashboard;