import dashboardImg from "../assests/dashboard.png";
import analyticsImg from "../assests/analytics.png";
import resumeImg from "../assests/resume.png";

import { Link } from "react-router-dom";
import {
  Brain,
  BarChart3,
  FileText,
  MessageSquare,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">

      {/* BACKGROUND BLOBS */}

    <div className="blob absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30"></div>

   <div className="blob absolute bottom-10 right-10 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 w-[80%] max-w-6xl mx-auto">

        {/* HERO */}

        <section className="py-24 text-center fade-up">

          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Brain size={16} />
            AI-Powered Interview Preparation Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-slate-900">

            InterviewIQ

            <span className="block text-indigo-600">
              Smart Interview Practice
            </span>

            <span className="block text-purple-600">
              For Modern Developers
            </span>

          </h1>

          <p className="max-w-3xl mx-auto mt-8 text-lg text-slate-600 leading-relaxed">
            Practice technical interviews, receive AI-generated feedback,
            analyze resumes, track progress through analytics, and improve
            interview performance using real-time evaluation powered by AI.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

            <Link
              to="/register"
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:bg-indigo-700 hover:-translate-y-1 hover:shadow-xl"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="border border-slate-300 bg-white px-8 py-4 rounded-xl transition-all duration-300 hover:bg-slate-100 hover:-translate-y-1 hover:shadow-lg"
            >
              Login
            </Link>

          </div>

        </section>

        {/* FEATURES */}

        <section className="py-16 fade-up">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-bold text-slate-900">
              Everything You Need
            </h2>

            <p className="text-slate-500 mt-4">
              Built for students, freshers and developers preparing for interviews.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

      <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-200">
              <MessageSquare className="text-indigo-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-3">
                AI Interview Practice
              </h3>
              <p className="text-slate-600">
                Generate role-based questions and receive detailed AI feedback,
                strengths, weaknesses and improvement suggestions.
              </p>
            </div>

           <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-200">
              <BarChart3 className="text-purple-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-3">
                Analytics Dashboard
              </h3>
              <p className="text-slate-600">
                Monitor performance trends, interview history, average scores
                and identify your strongest interview areas.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-200">
              <FileText className="text-indigo-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-3">
                Resume Analysis
              </h3>
              <p className="text-slate-600">
                Upload resumes and receive ATS-style analysis, missing skills,
                strengths and improvement recommendations.
              </p>
            </div>

          </div>

        </section>

        {/* SECTION 1 */}

        <section className="py-24 fade-up">

          <div className="flex flex-col lg:flex-row items-center gap-14 fade-up">

            <div className="flex-1">

              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Practice With
                <span className="text-indigo-600"> AI Generated </span>
                Interview Questions
              </h2>

              <p className="text-slate-600 leading-relaxed mb-6">
                Generate interview questions for React, Frontend Development,
                MERN Stack, Backend Development and more. Receive instant
                feedback that highlights strengths, weaknesses and areas that
                need improvement.
              </p>

              <ul className="space-y-4">

                <li className="flex items-center gap-3">
                  <CheckCircle className="text-indigo-600" />
                  Role-Based Questions
                </li>

                <li className="flex items-center gap-3">
                  <CheckCircle className="text-indigo-600" />
                  Instant AI Evaluation
                </li>

                <li className="flex items-center gap-3">
                  <CheckCircle className="text-indigo-600" />
                  Personalized Suggestions
                </li>

              </ul>

            </div>

            <div className="flex-1">

                    <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                          <img
                       src={dashboardImg}
                       alt="Dashboard"
                       className="w-full h-80 object-cover"
                        />
                      </div>

            </div>

          </div>

        </section>

        {/* SECTION 2 */}

        <section className="py-24">

          <div className="flex flex-col lg:flex-row-reverse items-center gap-14">

            <div className="flex-1">

              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Track Progress Through
                <span className="text-purple-600"> Analytics </span>
              </h2>

              <p className="text-slate-600 leading-relaxed mb-6">
                Understand your interview performance using score trends,
                topic-based analytics, recent activity tracking and detailed
                performance insights.
              </p>

              <ul className="space-y-4">

                <li className="flex items-center gap-3">
                  <CheckCircle className="text-purple-600" />
                  Performance Tracking
                </li>

                <li className="flex items-center gap-3">
                  <CheckCircle className="text-purple-600" />
                  Score Trends
                </li>

                <li className="flex items-center gap-3">
                  <CheckCircle className="text-purple-600" />
                  Topic Performance Analysis
                </li>

              </ul>

            </div>

            <div className="flex-1">

          <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                          <img
                       src={analyticsImg}
                       alt="Dashboard"
                       className="w-full h-80 object-cover"
                        />
                      </div>

            </div>

          </div>

        </section>

        {/* SECTION 3 */}

        <section className="py-24">

          <div className="flex flex-col lg:flex-row items-center gap-14">

            <div className="flex-1">

              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Improve Your Resume With
                <span className="text-indigo-600"> AI Insights </span>
              </h2>

              <p className="text-slate-600 leading-relaxed">
                Upload your resume and receive ATS-style evaluation including
                missing skills, strengths, weaknesses and actionable
                recommendations to improve interview readiness.
              </p>

            </div>

            <div className="flex-1">

           <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                          <img
                       src={resumeImg}
                       alt="Dashboard"
                       className="w-full h-80 object-cover"
                        />
                      </div>

            </div>

          </div>

        </section>

        {/* TESTIMONIALS */}

        <section className="py-16">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-bold text-slate-900">
              What Users Say
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <p className="text-slate-600">
                "The analytics helped me identify weak areas before interviews."
              </p>
              <h4 className="font-semibold mt-4">
                — Rekha Aggarwal (Frontend Developer)
              </h4>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <p className="text-slate-600">
                "Mock interviews felt realistic and improved my confidence."
              </p>
              <h4 className="font-semibold mt-4">
                — Manish (MERN Developer)
              </h4>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <p className="text-slate-600">
                "Resume analysis provided useful ATS suggestions."
              </p>
              <h4 className="font-semibold mt-4">
                — Syed Saad (Full Stack Developer)
              </h4>
            </div>

          </div>

        </section>

        {/* CTA */}

        <section className="py-24 text-center">

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white">

            <h2 className="text-4xl font-bold mb-4">
              Prepare Smarter With InterviewIQ
            </h2>

            <p className="max-w-2xl mx-auto opacity-90 mb-8">
              Start practicing interviews, improve your resume and track your
              growth with AI-powered insights.
            </p>

            <Link
              to="/register"
             className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:bg-slate-100 hover:-translate-y-1 hover:shadow-xl"
            >
              Create Account
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>

      </div>

      {/* FOOTER */}

      <footer className="border-t border-slate-200 bg-white mt-20">

        <div className="w-[80%] max-w-6xl mx-auto py-10 flex flex-col md:flex-row justify-between items-center gap-4">

          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
            <Brain size={24} />
            InterviewIQ
          </div>

          <p className="text-slate-500 text-sm">
            © 2026 InterviewIQ. AI-Powered Interview Preparation Platform.
          </p>

        </div>

      </footer>

    </div>
  );
};

export default Home;