import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/auth/register", form);
      login(data);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 flex items-center justify-center overflow-hidden px-4">

      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <div className="flex justify-center mb-4 text-indigo-600">
          <UserPlus size={42} />
        </div>

        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 ${
              error ? "border-red-400 focus:ring-red-300" : "focus:ring-indigo-500"
            }`}
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 ${
              error ? "border-red-400 focus:ring-red-300" : "focus:ring-indigo-500"
            }`}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 ${
              error ? "border-red-400 focus:ring-red-300" : "focus:ring-indigo-500"
            }`}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl">
              {error}
            </div>
          )}

          <button className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700">
            Register
          </button>

        </form>

        <p className="mt-4 text-center">
          Already have account?{" "}
          <Link to="/login" className="text-purple-600">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;