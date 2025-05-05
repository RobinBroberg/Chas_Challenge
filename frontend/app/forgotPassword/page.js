"use client";
import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError("");
      } else {
        setError(data.error || "Något gick fel.");
        setMessage("");
      }
    } catch (err) {
      setError("Serverfel. Försök igen senare.");
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/loginpic.png')" }}
    >
      <div className="flex flex-col space-y-6 mb-30 w-96 p-6 bg-black bg-opacity-50 rounded-xl">
        <h1 className="text-3xl font-semibold text-center text-white">
          Glömt lösenord
        </h1>
        <p className="text-white text-sm text-center">
          Ange din e-postadress för att återställa ditt lösenord.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-postadress"
            className="w-full border-b-2 border-white bg-transparent text-white placeholder-white p-2 focus:outline-none focus:border-gray-300"
          />

          <button
            type="submit"
            className="w-full py-2 bg-gray-300 text-[#47423E] font-bold rounded-full hover:bg-gray-400 transition"
          >
            Skicka återställningslänk
          </button>
        </form>

        {message && (
          <p className="text-green-400 text-sm text-center">{message}</p>
        )}
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
