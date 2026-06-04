import { useState } from "react";

import API from "../services/api";

import {
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Target,
} from "lucide-react";

const ResumeAnalyzer = () => {
  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const analyzeResume =
    async () => {
      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "resume",
          file
        );

        const { data } =
          await API.post(
            "/resume/analyze",
            formData
          );

        setResult(data);

      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">

      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative z-10 w-[80%] max-w-5xl mx-auto py-14">

        <div className="text-center mb-10">

          <FileText
            size={55}
            className="mx-auto text-indigo-600 mb-4"
          />

          <h1 className="text-4xl font-bold">
            Resume Analyzer
          </h1>

          <p className="text-slate-500 mt-3">
            Upload your resume
            and get ATS insights
          </p>

        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">

      <div className="mb-6">
  <label className="block mb-3 font-medium text-slate-700">
    Upload Resume PDF
  </label>

  <input
    type="file"
    accept=".pdf"
    onChange={(e) =>
      setFile(e.target.files[0])
    }
    className="block w-full border border-slate-300 rounded-xl p-3 bg-white"
  />

  {file && (
    <p className="mt-2 text-green-600 text-sm">
      {file.name}
    </p>
  )}
</div>

          <button
            onClick={analyzeResume}
            disabled={
              !file || loading
            }
            className="w-full bg-indigo-600 text-white p-4 rounded-xl flex items-center justify-center gap-2"
          >
            <Upload size={20} />

            {loading
              ? "Analyzing..."
              : "Analyze Resume"}
          </button>

        </div>

        {result && (
          <div className="mt-8 space-y-6">

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 flex justify-between items-center">

              <div>

                <h2 className="text-3xl font-bold">
                  ATS Score
                </h2>

              </div>

              <div className="text-5xl font-bold">
                {
                  result.atsScore
                }
                /100
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">

                <div className="flex items-center gap-2 mb-4">

                  <CheckCircle />

                  <h3 className="font-semibold">
                    Strengths
                  </h3>

                </div>

                <ul className="space-y-2">

                  {result.strengths?.map(
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

                  <AlertCircle />

                  <h3 className="font-semibold">
                    Weaknesses
                  </h3>

                </div>

                <ul className="space-y-2">

                  {result.weaknesses?.map(
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

            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">

              <h3 className="font-semibold text-lg mb-4">
                Missing Skills
              </h3>

              <ul className="space-y-2">

                {result.missingSkills?.map(
                  (
                    item,
                    index
                  ) => (
                    <li
                      key={index}
                    >
                      • {item}
                    </li>
                  )
                )}

              </ul>

            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">

              <div className="flex items-center gap-2 mb-4">

                <Target />

                <h3 className="font-semibold">
                  Suggestions
                </h3>

              </div>

              <ul className="space-y-2">

                {result.suggestions?.map(
                  (
                    item,
                    index
                  ) => (
                    <li
                      key={index}
                    >
                      • {item}
                    </li>
                  )
                )}

              </ul>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default ResumeAnalyzer;