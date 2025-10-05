import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function Login() {
  const { axios, setToken } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/login", { email, password });
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
        toast.success("Login successful!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 overflow-hidden">

      {/* Glowing circles */}
      <div className="absolute w-72 h-72 bg-blue-500/30 rounded-full top-[-100px] left-[-100px] blur-3xl animate-blob"></div>
      <div className="absolute w-64 h-64 bg-purple-500/30 rounded-full bottom-[-80px] right-[-80px] blur-3xl animate-blob animation-delay-2000"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md p-10 rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg transition-all duration-500 hover:scale-105">

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            Admin Portal
          </h1>
          <p className="mt-2 text-gray-300 text-sm">
            Welcome back, please sign in
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 text-white/70 w-5 h-5 group-focus-within:text-blue-300 transition-all" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              placeholder="Email Address"
              className="w-full pl-10 p-3.5 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/50 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition-all duration-300 shadow-lg"
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 text-white/70 w-5 h-5 group-focus-within:text-blue-300 transition-all" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              placeholder="Password"
              className="w-full pl-10 p-3.5 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/50 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40 transition-all duration-300 shadow-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-blue-400 via-teal-400 to-purple-500 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-300 text-xs mt-6">
          © 2025 Admin Panel — All rights reserved.
        </p>
      </div>

      {/* Blob Animation */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}

export default Login;
