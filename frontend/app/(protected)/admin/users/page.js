"use client";

import React, { useState } from "react";
import { registerUser } from "@/services/api";

const CreateAccountPage = () => {
  const [role, setRole] = useState("hr");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleCreateAccount = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const result = await registerUser({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
        role, // OBS: backend måste tillåta detta om rollen ska sparas korrekt
      });

      setMessage("Kontot skapades!");
      console.log("Resultat:", result);
      // Återställ formulär
      setFirstName("");
      setLastName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setRole("hr");
    } catch (err) {
      console.error(err);
      setError(err.message || "Ett fel uppstod.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/loginpic.png')" }}
    >
      <div className="flex flex-col space-y-6 mb-30">
        <h2
          className="text-4xl font-medium text-left mb-4"
          style={{ color: "#F6F4F0" }}
        >
          Skapa konto
        </h2>

        {message && <p className="text-green-300">{message}</p>}
        {error && <p className="text-red-400">{error}</p>}

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border-b-2 w-160 border-white p-2 text-lg bg-transparent text-white focus:outline-none"
        >
          <option value="hr">HR / Chef</option>
          <option value="worker">Medarbetare</option>
        </select>

        <input
          type="text"
          placeholder="Förnamn"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border-b-2 w-160 border-white p-2 text-lg focus:outline-none text-white placeholder-white focus:border-gray-300"
        />

        <input
          type="text"
          placeholder="Efternamn"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border-b-2 w-160 border-white p-2 text-lg focus:outline-none text-white placeholder-white focus:border-gray-300"
        />

        <input
          type="email"
          placeholder="E-postadress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b-2 w-160 border-white p-2 text-lg focus:outline-none text-white placeholder-white focus:border-gray-300"
        />

        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-b-2 w-160 border-white p-2 text-lg focus:outline-none text-white placeholder-white focus:border-gray-300"
        />

        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-b-2 w-160 border-white p-2 text-lg focus:outline-none text-white placeholder-white focus:border-gray-300"
        />

        <div className="flex justify-center">
          <button
            onClick={handleCreateAccount}
            disabled={loading}
            className={`px-10 py-4 rounded-full font-bold text-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            style={{ color: "#47423E" }}
          >
            {loading ? "Skapar konto..." : "Skapa konto"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
