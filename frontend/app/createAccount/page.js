"use client";

import React, { useState } from "react";

export default function creaeteAccount() {
  const [mode, setMode] = (useState < "login") | ("register" > "login");
  const [userType, setUserType] = (useState < "hr") | ("worker" > "hr");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    console.log("Loggar in som:", userType);
    console.log("Användarnamn:", username);
    console.log("Lösenord:", password);
  };

  const handleRegister = () => {
    console.log("Registrerar medarbetare:");
    console.log({ firstName, lastName, email, username, password });
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: "url('/loginpic.png')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#4e4a45] mb-4">
          {mode === "login" ? "Logga in" : "Skapa Konto"}
        </h2>

        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setMode("login")}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              mode === "login"
                ? "bg-[#d4bfa5] text-white"
                : "bg-gray-200 text-[#47423E]"
            }`}
          >
            Logga in
          </button>
          <button
            onClick={() => setMode("register")}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              mode === "register"
                ? "bg-[#d4bfa5] text-white"
                : "bg-gray-200 text-[#47423E]"
            }`}
          >
            Skapa konto
          </button>
        </div>

        {mode === "login" ? (
          <>
            <div className="flex justify-center mb-4">
              <label className="text-sm mr-3">Välj roll:</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="hr">HR / Chef</option>
                <option value="worker">Medarbetare</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Användarnamn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border-b-2 border-[#d4bfa5] bg-transparent focus:outline-none text-[#47423E] placeholder-[#aaa]"
            />
            <input
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-b-2 border-[#d4bfa5] bg-transparent focus:outline-none text-[#47423E] placeholder-[#aaa]"
            />

            <button
              onClick={handleLogin}
              className="w-full py-3 mt-4 bg-[#d4bfa5] text-white font-semibold rounded-lg shadow-md hover:bg-[#c6aa8c] transition"
            >
              Logga in
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Förnamn"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 border-b-2 border-[#d4bfa5] bg-transparent focus:outline-none text-[#47423E] placeholder-[#aaa]"
            />
            <input
              type="text"
              placeholder="Efternamn"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 border-b-2 border-[#d4bfa5] bg-transparent focus:outline-none text-[#47423E] placeholder-[#aaa]"
            />
            <input
              type="email"
              placeholder="Epostadress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-b-2 border-[#d4bfa5] bg-transparent focus:outline-none text-[#47423E] placeholder-[#aaa]"
            />
            <input
              type="text"
              placeholder="Användarnamn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border-b-2 border-[#d4bfa5] bg-transparent focus:outline-none text-[#47423E] placeholder-[#aaa]"
            />
            <input
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-b-2 border-[#d4bfa5] bg-transparent focus:outline-none text-[#47423E] placeholder-[#aaa]"
            />

            <button
              onClick={handleRegister}
              className="w-full py-3 mt-4 bg-[#d4bfa5] text-white font-semibold rounded-lg shadow-md hover:bg-[#c6aa8c] transition"
            >
              Skapa konto
            </button>
          </>
        )}
      </div>
    </div>
  );
}
