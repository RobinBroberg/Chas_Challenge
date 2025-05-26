"use client";
import React, { useState, useEffect } from "react";
import { login, getCurrentUser } from "@/services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const loginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { refreshUser } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (user) {
        router.push(user.role === "admin" ? "/" : "/");
      }
    };
    checkAuth();
  }, []);

  async function handleLogin() {
    if (!email || !password) {
      setErrorMessage("Fyll i både e-postadress och lösenord.");
      return;
    }
    if (!email.includes("@")) {
      setErrorMessage("Ogiltig e-postadress");
      return;
    }
    try {
      const data = await login(email, password);
      await refreshUser();
      if (data.role === "admin") {
        router.push("/admin/profile");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Login failed:", err.message);
      setErrorMessage("Login misslyckades");
    }
  }

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/landingHeader.png')" }}
    >
      <div className="flex flex-col space-y-6 max-w-[800px] w-full">
        <h2 className="text-3xl sm:text-4xl font-semibold font-montserrat text-white text-left mb-40">
          Logga in
        </h2>

        <input
          type="text"
          placeholder="E-postadress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b-3 border-white p-2 text-lg font-medium focus:outline-none text-white placeholder-white focus:border-gray-300 font-montserrat bg-transparent z"
        />

        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-b-3 border-white p-2 text-lg focus:outline-none font-medium text-white placeholder-white focus:border-gray-300 font-montserrat bg-transparent"
        />

        {errorMessage && (
          <p className="text-white text-sm font-montserrat">{errorMessage}</p>
        )}

        <div className="flex justify-end">
          <Link
            href="/reset-password"
            className="text-sm text-white font-medium hover:underline font-montserrat"
          >
            Glömt lösenord?
          </Link>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleLogin}
            className="font-montserrat w-5/6  py-4 bg-white text-black hover:bg-[#7B7D70]  hover:text-white rounded-full text-xl font-semibold duration-200 hover:shadow-[inset_0px_5px_4px_rgba(0,0,0,0.25)]"
          >
            Logga in
          </button>
        </div>
      </div>
    </div>
  );
};

export default loginPage;
