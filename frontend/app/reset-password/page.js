"use client";
import React, { useState } from "react";
import Link from "next/link";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) return;

    setSubmitted(true);
    setEmail("");
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/landingHeader.png')" }}
    >
      <div className="flex flex-col space-y-6 max-w-[800px] w-full">
        <h2 className="text-3xl sm:text-4xl font-semibold font-montserrat text-white text-left mb-20">
          Återställ lösenord
        </h2>

        <input
          type="text"
          placeholder="E-postadress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b-3 border-white p-2 text-lg font-medium focus:outline-none text-white placeholder-white focus:border-gray-300 font-montserrat bg-transparent"
        />

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="font-montserrat w-5/6 py-4 bg-white text-black hover:bg-[#7B7D70] hover:text-white rounded-full text-xl font-semibold duration-200 hover:shadow-[inset_0px_5px_4px_rgba(0,0,0,0.25)]"
          >
            Skicka
          </button>
        </div>

        {submitted && (
          <p className="text-white text-center font-montserrat mt-4">
            Ett mejl med instruktioner har skickats (inte på riktigt).
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
