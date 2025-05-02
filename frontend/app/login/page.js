"use client";
import React, { useState, useEffect } from "react";
import { login, getCurrentUser } from "@/utils/api";
import { useRouter } from "next/navigation";

const loginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (user) {
        router.push(user.role === "admin" ? "/questions" : "/");
      }
    };
    checkAuth();
  }, []);

  async function handleLogin() {
    try {
      const data = await login(email, password);
      if (data.role === "admin") {
        router.push("/questions");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Login failed:", err.message);
      alert("Login misslyckades");
    }
  }

  const handleCreateAccount = () => {
    // Implementera logik för att skapa konto
    console.log("Skapa konto");
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
        >
          Logga in
        </h2>

        <input
          type="text"
          placeholder="Email"
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

        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleLogin}
            className="px-27 py-4 bg-gray-300 text-white rounded-full hover:bg-gray-400 transition font-bold text-lg"
            style={{ color: "#47423E" }}
          >
            Logga in
          </button>

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

export default loginPage;
