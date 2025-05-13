"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const emailFromURL = searchParams.get("email");

  const [email, setEmail] = useState(emailFromURL || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef(null);

  const isResetMode = !!token && !!emailFromURL;

  useEffect(() => {
    if (!isResetMode) {
      emailInputRef.current?.focus();
    }
  }, [isResetMode]);

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
        setMessage(data.message || "Återställningslänk skickad.");
      } else {
        setError(data.message || "Något gick fel.");
      }
    } catch {
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

    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte.");
      setLoading(false);
      return;
    }

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
    } catch {
      setError("Något gick fel. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/loginpic.png')" }}
    >
      <div className="relative w-full max-w-md">
        {/* Bakgrunds-overlay */}
        <div className="absolute inset-0 bg-black/40 rounded-xl backdrop-blur-md z-0 shadow-2xl" />

        {/* Innehåll */}
        <div className="relative z-10 p-8 rounded-xl w-full text-white">
          <h1 className="text-3xl font-semibold text-center mb-6 drop-shadow-md">
            {isResetMode ? "Sätt nytt lösenord" : "Glömt lösenord"}
          </h1>

          <form
            onSubmit={isResetMode ? handleResetPassword : handleForgotPassword}
            className="space-y-4"
          >
            <div>
              <input
                ref={emailInputRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!!emailFromURL}
                placeholder="E-postadress"
                className="w-full px-4 py-2 bg-white/10 border-b border-white/30 text-white placeholder-white/70 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>

            {isResetMode && (
              <>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nytt lösenord"
                  className="w-full px-4 py-2 bg-white/10 border-b border-white/30 text-white placeholder-white/70 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Bekräfta lösenord"
                  className="w-full px-4 py-2 bg-white/10 border-b border-white/30 text-white placeholder-white/70 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
                />

                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword((prev) => !prev)}
                    className="mr-2"
                  />
                  Visa lösenord
                </label>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-white text-[#47423E] font-semibold rounded-full hover:bg-gray-200 transition"
            >
              {loading
                ? "Skickar..."
                : isResetMode
                ? "Återställ lösenord"
                : "Skicka återställningslänk"}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-green-400 text-center text-sm">{message}</p>
          )}
          {error && (
            <p className="mt-4 text-red-400 text-center text-sm">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
