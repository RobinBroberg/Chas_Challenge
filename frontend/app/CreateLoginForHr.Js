import React from "react";
import bgImage from "../assets/hr.chef.jpg.jpg";

const CreateLoginForHr = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#4e4a45] mb-8">
          HR / Chef
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-[#6d665e] font-medium">
              Användarnamn
            </label>
            <input
              type="text"
              placeholder="Ditt användarnamn"
              className="w-full p-3 rounded-lg border border-[#d4bfa5] focus:ring-2 focus:ring-[#d4bfa5] outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-[#6d665e] font-medium">
              Lösenord
            </label>
            <input
              type="password"
              placeholder="Ditt lösenord"
              className="w-full p-3 rounded-lg border border-[#d4bfa5] focus:ring-2 focus:ring-[#d4bfa5] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#d4bfa5] hover:bg-[#c6aa8c] text-white py-3 rounded-lg font-semibold transition"
          >
            Logga in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6d665e]">
          Har du inget konto?{" "}
          <a href="/hr/signup" className="text-[#d4bfa5] hover:underline">
            Skapa ett här
          </a>
        </p>
      </div>
    </div>
  );
};

export default CreateLoginForHr;
