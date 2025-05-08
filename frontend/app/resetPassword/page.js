"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const emailFromURL = searchParams.get("email");

  const [email, setEmail] = useState(emailFromURL || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isResetMode = token && emailFromURL;

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:3001/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
      } else {
        setError(data.message || "Något gick fel.");
      }
    } catch (err) {
      setError("Serverfel. Försök igen senare.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:3001/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailFromURL, token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Lösenordet har återställts.");
      } else {
        setError(data.message || "Misslyckades att återställa lösenord.");
      }
    } catch (err) {
      setError("Något gick fel. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/loginpic.png')" }}
    >
      <div className="flex flex-col space-y-6 p-6 bg-black bg-opacity-60 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-semibold text-white text-center">
          {isResetMode ? "Sätt nytt lösenord" : "Glömt lösenord"}
        </h1>

        <form
          onSubmit={isResetMode ? handleResetPassword : handleForgotPassword}
          className="space-y-4"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-postadress"
            disabled={!!emailFromURL}
            className="w-full border-b-2 border-white bg-transparent text-white placeholder-white p-2 focus:outline-none"
          />

          {isResetMode && (
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nytt lösenord"
              className="w-full border-b-2 border-white bg-transparent text-white placeholder-white p-2 focus:outline-none"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gray-300 text-[#47423E] font-bold rounded-full hover:bg-gray-400 transition"
          >
            {loading
              ? "Skickar..."
              : isResetMode
              ? "Återställ lösenord"
              : "Skicka återställningslänk"}
          </button>
        </form>

        {message && (
          <p className="text-green-400 text-center text-sm">{message}</p>
        )}
        {error && <p className="text-red-400 text-center text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
