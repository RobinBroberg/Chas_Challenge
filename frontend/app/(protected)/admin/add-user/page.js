"use client";
import React, { useState } from "react";
import { registerUser } from "@/services/api";

const CreateAccountPage = () => {
  const [regMsg, setRegMsg] = useState("");

  const [newUser, setNewUser] = useState({
    role: "user",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    department: "",
  });

  const handleInput = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateAccount = async () => {
    const { first_name, last_name, email, password } = newUser;

    if (!first_name || !last_name || !email || !password) {
      setRegMsg("Alla fält måste fyllas i.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setRegMsg("Ogiltig e-postadress.");
      return;
    }

    try {
      await registerUser(newUser);

      setRegMsg("Användare skapad!");
      setNewUser({
        role: "user",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        department: "",
      });
    } catch (err) {
      console.error("Registration failed:", err);
      setRegMsg("Fel vid registrering: " + err.message);
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12 font-montserrat"
      style={{ backgroundImage: "url('/user-creation-bg.png')" }}
    >
      <div className="w-full max-w-4xl text-[#F6F4F0]">
        <h2 className="font-montserrat font-semibold text-[35px] leading-[1] mb-25">
          Skapa konto för
        </h2>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <select
            name="role"
            value={newUser.role}
            onChange={handleInput}
            className="flex-1 border-b-2 border-white  text-white p-2 text-xl bg-transparent placeholder-white focus:outline-none"
          >
            <option value="admin" className="text-black">
              HR / Chef
            </option>
            <option value="user" className="text-black">
              Medarbetare
            </option>
          </select>

          <input
            type="text"
            name="department"
            placeholder="Avdelning"
            value={newUser.department}
            onChange={handleInput}
            className="flex-1 border-b-2 border-white bg-transparent p-2 text-xl text-[#F6F4F0] placeholder-white focus:outline-none"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <input
            type="text"
            name="first_name"
            placeholder="Förnamn"
            value={newUser.first_name}
            onChange={handleInput}
            className="flex-1 border-b-2 border-white bg-transparent p-2 text-xl text-[#F6F4F0] placeholder-white focus:outline-none"
          />

          <input
            type="text"
            name="last_name"
            placeholder="Efternamn"
            value={newUser.last_name}
            onChange={handleInput}
            className="flex-1 border-b-2 border-white bg-transparent p-2 text-xl text-[#F6F4F0] placeholder-white focus:outline-none"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="E-postadress"
          value={newUser.email}
          onChange={handleInput}
          className="w-full border-b-2 border-white bg-transparent p-2 mb-6 text-xl text-[#F6F4F0] placeholder-white focus:outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Lösenord"
          value={newUser.password}
          onChange={handleInput}
          className="w-full border-b-2 border-white bg-transparent p-2 mb-10 text-xl text-[#F6F4F0] placeholder-white focus:outline-none"
        />

        <div className="flex justify-center">
          <button
            onClick={handleCreateAccount}
            className="w-4/6 py-4 px-12 bg-white text-black rounded-full font-bold text-lg transition-all duration-200 hover:bg-[#7B7D70] hover:text-white shadow-md"
            style={{ boxShadow: "inset 0px 5px 4px rgba(0, 0, 0, 0.25)" }}
          >
            Skapa konto
          </button>
        </div>

        {regMsg && (
          <p className="text-white text-center text-sm mt-4">{regMsg}</p>
        )}
      </div>
    </div>
  );
};

export default CreateAccountPage;
