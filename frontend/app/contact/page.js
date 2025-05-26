"use client";

import { useState, useEffect } from "react";

export default function Contact() {
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleSend = () => {
    setToast({
      message: "Du har nu skickat meddelandet.",
      type: "success",
    });
  };

  useEffect(() => {
    if (toast.message) {
      const timeout = setTimeout(
        () => setToast({ message: "", type: "" }),
        4000
      );
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  const getToastStyles = () => {
    return (
      "fixed top-6 right-6 z-50 px-6 py-4 shadow-lg text-sm font-medium bg-white border border-[#A3B17C] max-w-xs" +
      " rounded-tr-2xl rounded-br-2xl rounded-bl-2xl rounded-tl-none"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#85967b] to-[#e8f0e0] flex justify-center">
      <div className="font-montserrat text-black flex flex-col pt-20 p-4 sm:p-8 md:p-16 max-w-5xl w-full">
        {toast.message && (
          <div className={getToastStyles()}>
            <div className="text-gray-900 font-semibold mb-1 text-base">
              Tack för ditt meddelande!
            </div>
            <div className="text-gray-600 text-sm">{toast.message}</div>
          </div>
        )}

        <div className="mb-10">
          <h1 className="font-medium text-2xl sm:text-3xl mb-4 sm:mb-6">
            kontakt oss gärna!
          </h1>
          <h2 className="font-medium text-base sm:text-lg tracking-wide">
            Kom enkelt i kontakt med oss med hjälp av formuläret. Du får en
            offert redan nästkommande vardag.
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mb-6">
          <input
            type="text"
            placeholder="Företagsnamn"
            className="flex-1 px-4 h-14 text-black bg-[#FBFAF5] border border-[#5F6F52] rounded-[10px]"
          />
          <input
            type="text"
            placeholder="Organisationsnummer"
            className="flex-1 px-4 h-14 text-black bg-[#FBFAF5] border border-[#5F6F52] rounded-[10px]"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mb-6">
          <input
            type="email"
            placeholder="E-postadress"
            className="flex-1 px-4 h-14 text-black bg-[#FBFAF5] border border-[#5F6F52] rounded-[10px]"
          />
          <input
            type="text"
            placeholder="Telefonnummer"
            className="flex-1 px-4 h-14 text-black bg-[#FBFAF5] border border-[#5F6F52] rounded-[10px]"
          />
        </div>

        <div className="mb-6">
          <textarea
            placeholder="Meddelande"
            className="w-full px-4 py-4 h-28 resize-none text-black bg-[#FBFAF5] border border-[#5F6F52] rounded-[10px]"
          />
        </div>

        <button
          className="self-center mt-5 text-white w-40 h-14 sm:h-16 text-lg sm:text-xl md:text-3xl bg-[#464C35] hover:bg-[#5F6F52] rounded-full cursor-pointer transition-colors duration-200"
          style={{
            boxShadow: "inset 0px 21px 11.9px rgba(189, 188, 188, 0.25)",
          }}
          onClick={handleSend}
        >
          Skicka
        </button>
      </div>
    </div>
  );
}
