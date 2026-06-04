import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";



import {
  Brain,
  LayoutDashboard,
  History,
  LogOut,
  Menu,
  X,
  MessageSquare,
  Sparkles,
  FileText
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">

      <div className="w-[90%] max-w-6xl mx-auto py-4 flex items-center justify-between">

     <Link
  to="/"
  className="flex items-center gap-2 text-2xl font-bold text-indigo-600"
>
  <Brain size={30} />
  InterviewIQ
</Link>

        <div className="hidden md:flex items-center gap-6">

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition"
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>

              <Link
                to="/interview"
                className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition"
              >
                <MessageSquare size={20} />
                Practice
              </Link>

              <Link
                to="/mock-interview"
                className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition"
              >
                <Sparkles size={20} />
                Mock Interview
              </Link>

              <Link
  to="/resume-analyzer"
  className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition"
>
  <FileText size={20} />
  Resume Analyzer
</Link>

              <Link
                to="/history"
                className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition"
              >
                <History size={20} />
                History
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-700 hover:text-indigo-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </>
          )}

        </div>

        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="md:hidden text-slate-700"
        >
          {menuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>

      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">

          <div className="w-[90%] mx-auto py-6 flex flex-col gap-5">

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="flex items-center gap-3 text-slate-700 hover:text-indigo-600 transition"
                >
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>

                <Link
                  to="/interview"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="flex items-center gap-3 text-slate-700 hover:text-indigo-600 transition"
                >
                  <MessageSquare size={20} />
                  Practice
                </Link>

                <Link
                  to="/mock-interview"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="flex items-center gap-3 text-slate-700 hover:text-indigo-600 transition"
                >
                  <Sparkles size={20} />
                  Mock Interview
                </Link>

                <Link
  to="/resume-analyzer"
  onClick={() =>
    setMenuOpen(false)
  }
  className="flex items-center gap-3 text-slate-700 hover:text-indigo-600 transition"
>
  <FileText size={20} />
  Resume Analyzer
</Link>

                <Link
                  to="/history"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="flex items-center gap-3 text-slate-700 hover:text-indigo-600 transition"
                >
                  <History size={20} />
                  History
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-red-500 hover:text-red-600 transition"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="text-slate-700 hover:text-indigo-600 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition text-center"
                >
                  Register
                </Link>
              </>
            )}

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;