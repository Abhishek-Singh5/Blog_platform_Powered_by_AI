"use client"
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter an email");

    try {
      setLoading(true);
      const { data } = await axios.post("/api/email", { email });
      console.log("subscribe response:", data);

      if (data && data.success) {
        toast.success("🎉 You’re now subscribed to our newsletter!");
        setEmail("");
      } else {
        toast.error(data?.msg || "Failed to subscribe");
      }
    } catch (err) {
      console.error("Newsletter subscribe error:", err);
      toast.error(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

    return (
    // Outer container with spacing and the main lucid glass effect
    <div className="flex flex-col items-center justify-center space-y-4 my-32 relative px-6 py-12 mx-auto max-w-4xl rounded-3xl shadow-2xl backdrop-blur-3xl bg-white/20 border border-white/20 transition-all duration-500">
      <h1 className="md:text-5xl text-3xl font-extrabold text-gray-900 drop-shadow-sm">
        Never Miss a <span className="text-blue-600">Blog!</span>
      </h1>
      <p className="md:text-lg text-gray-700 max-w-xl">
        Subscribe to get the latest blogs, new tech insights, and exclusive updates straight to your inbox.
      </p>

      {/* Subscription Form with Clean Design */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12 bg-white rounded-full overflow-hidden mt-6 shadow-xl transition-all duration-300"
      >
        <input
          className="h-full w-full px-5 text-gray-800 placeholder-gray-400 bg-transparent outline-none"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          // Updated to blue color
          className="md:px-10 px-6 h-full bg-blue-600 text-white font-semibold tracking-wide hover:bg-blue-700 transition-all duration-300 cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
export default Newsletter;
