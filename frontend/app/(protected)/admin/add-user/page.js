"use client";
import React, { useState } from "react";

const CreateAccountPage = () => {
  const [role, setRole] = useState("worker");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = () => {
    console.log("Skapar konto:", {
      role,
      firstName,
      lastName,
      email,
      password,
    });
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/loginpic.png')" }}
    >
      <div className="flex flex-col space-y-6 mb-30">
        <h2
          className="text-4xl font-medium text-left mb-18"
          style={{ color: "#F6F4F0" }}
        ></h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border-b-2 w-160 border-white p-2 text-lg bg-transparent text-white focus:outline-none"
        >
          <option value="admin">HR / Chef</option>
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
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-b-2 w-160 border-white p-2 text-lg focus:outline-none text-white placeholder-white focus:border-gray-300"
        />

        <div className="flex justify-center">
          <button
            onClick={handleCreateAccount}
            className="px-27 py-4 bg-gray-300 text-white rounded-full hover:bg-gray-400 transition font-bold text-lg"
            style={{ color: "#47423E" }}
          >
            Skapa konto
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
