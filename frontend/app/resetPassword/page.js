"use client";
import React, { useState } from "react";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("A password reset link has been sent to your email.");
      } else {
        setMessage(data.message || "Something went wrong, please try again.");
      }
    } catch (error) {
      setMessage("Error occurred. Please try again later.");
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/loginpic.png')" }}
    >
      <div className="flex flex-col space-y-6 mb-30 p-4 bg-white rounded-lg shadow-lg">
        <h2
          className="text-3xl font-medium text-left mb-4"
          style={{ color: "#47423E" }}
        >
          Reset Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b-2 w-160 border-gray-300 p-2 text-lg focus:outline-none placeholder-gray-400"
        />

        <div className="flex justify-center">
          <button
            onClick={handleResetPassword}
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition font-bold text-lg"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>

        {message && (
          <div className="mt-4 text-center text-lg text-red-500">{message}</div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
