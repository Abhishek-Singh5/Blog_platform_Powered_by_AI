import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import AddBlog from "../../pages/admin/AddBlog";
import { useNavigate } from "react-router-dom";

function Login() {
  const { axios, setToken } = useAppContext();

  const navigate = useNavigate();
  
  // States to manage UI flow
  const [role, setRole] = useState("admin"); 
  const [isSignup, setIsSignup] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Determine endpoint based on role and mode
      const endpoint = role === "admin" 
        ? "/api/admin/login" 
        : (isSignup ? "/api/auth/register" : "/api/auth/login");

      const payload = isSignup ? { name, email, password } : { email, password };

      const { data } = await axios.post(endpoint, payload);
      
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
        toast.success(isSignup ? "Account created!" : "Login successfull!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute w-72 h-72 bg-blue-500/30 rounded-full top-[-100px] left-[-100px] blur-3xl animate-blob"></div>
      <div className="absolute w-64 h-64 bg-purple-500/30 rounded-full bottom-[-80px] right-[-80px] blur-3xl animate-blob animation-delay-2000"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500">
        
        {/* Role Selector (Admin vs User) */}
        <div className="flex justify-center mb-8">
          <div className="relative flex bg-black/20 p-1 rounded-2xl border border-white/10 w-full">
            <button 
              onClick={() => { setRole("admin"); setIsSignup(false); }}
              className={`relative z-10 w-1/2 py-2 text-sm font-bold transition-colors duration-300 ${role === 'admin' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Admin
            </button>
            <button 
              onClick={() => setRole("user")}
              className={`relative z-10 w-1/2 py-2 text-sm font-bold transition-colors duration-300 ${role === 'user' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              User
            </button>
            {/* Sliding Background Pill */}
            <div className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl transition-transform duration-300 ease-out shadow-lg ${role === 'user' ? 'translate-x-full' : 'translate-x-0'}`}></div>
          </div>
        </div>

        {/* Dynamic Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {role === 'admin' ? 'Authorized Access Only' : 'Please enter your details'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name Field (Only shows if User role AND Signup mode) */}
          {role === "user" && isSignup && (
            <div className="relative group animate-in fade-in slide-in-from-top-2 duration-300">
              <User className="absolute left-3 top-3.5 text-white/50 w-5 h-5 group-focus-within:text-blue-400 transition-all" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                required
                placeholder="Full Name"
                className="w-full pl-10 p-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 outline-none focus:border-blue-400/50 focus:ring-4 focus:ring-blue-400/10 transition-all shadow-inner"
              />
            </div>
          )}

          {/* Email */}
          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 text-white/50 w-5 h-5 group-focus-within:text-blue-400 transition-all" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              placeholder="Email Address"
              className="w-full pl-10 p-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 outline-none focus:border-blue-400/50 focus:ring-4 focus:ring-blue-400/10 transition-all shadow-inner"
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 text-white/50 w-5 h-5 group-focus-within:text-blue-400 transition-all" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              placeholder="Password"
              className="w-full pl-10 p-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 outline-none focus:border-blue-400/50 focus:ring-4 focus:ring-blue-400/10 transition-all shadow-inner"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full py-3.5 font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl transition-all duration-300 hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
          >
            <span className="relative z-10">{isSignup ? "Sign Up" : "Login"}</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </form>

        {/* User-only Signup/Login Toggle */}
        {role === "user" && (
          <p className="text-center text-gray-400 text-sm mt-6">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button 
              onClick={() => setIsSignup(!isSignup)}
              className="ml-2 text-blue-400 font-semibold hover:underline decoration-blue-400/50 underline-offset-4"
            >
              {isSignup ? "Login" : "Sign up"}
            </button>
          </p>
        )}

        {/* Footer */}
        <p className="text-center text-gray-500 text-[10px] mt-8 uppercase tracking-[0.2em]">
          © 2025 Secure Access Portal
        </p>
      </div>

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