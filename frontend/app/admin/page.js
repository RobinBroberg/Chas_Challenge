"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-[#f6f4f0]">
      {/* Mobilmeny-overlay */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } fixed inset-0 bg-[#47423E] bg-opacity-80 md:hidden z-10`}
        onClick={toggleMenu}
      >
        <div className="flex flex-col p-6">
          <ul>
            <li className="mb-4">
              <Link
                href="/admin/users"
                className="text-[#d4bfa5] hover:text-[#c6aa8c]"
              >
                Användare
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/admin/surveys"
                className="text-[#d4bfa5] hover:text-[#c6aa8c]"
              >
                Enkäter
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/admin/settings"
                className="text-[#d4bfa5] hover:text-[#c6aa8c]"
              >
                Inställningar
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Sidomeny desktop */}
      <div className="w-64 bg-[#47423E] text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-6">Adminpanel</h2>
        <ul>
          <li className="mb-4">
            <Link
              href="/admin/users"
              className="text-[#d4bfa5] hover:text-[#c6aa8c]"
            >
              Användare
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/admin/surveys"
              className="text-[#d4bfa5] hover:text-[#c6aa8c]"
            >
              Enkäter
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/admin/settings"
              className="text-[#d4bfa5] hover:text-[#c6aa8c]"
            >
              Inställningar
            </Link>
          </li>
        </ul>
      </div>

      {/* Innehåll */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-10 pt-20">
          <h1 className="text-4xl font-extrabold text-[#47423E]">Adminpanel</h1>

          {/* Menyknapp för mobil */}
          <button
            className="md:hidden text-[#47423E] p-2 rounded"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {/* Användarhantering */}
          <div className="bg-[#2a2a2a] shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">
              Användarhantering
            </h2>
            <p className="text-sm mb-4 text-white">
              Skapa, redigera eller ta bort användare.
            </p>
            <button
              onClick={() => router.push("/admin/users")}
              className="bg-[#d4bfa5] text-white px-4 py-2 rounded hover:bg-[#c6aa8c] transition"
            >
              Hantera användare
            </button>
          </div>

          {/* Enkätresultat */}
          <div className="bg-[#2a2a2a] shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">
              Enkätresultat
            </h2>
            <p className="text-sm mb-4 text-white">
              Se svar och statistik från enkäter.
            </p>
            <button
              onClick={() => router.push("/admin/surveys")}
              className="bg-[#d4bfa5] text-white px-4 py-2 rounded hover:bg-[#c6aa8c] transition"
            >
              Visa resultat
            </button>
          </div>

          {/* Inställningar */}
          <div className="bg-[#2a2a2a] shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">
              Inställningar
            </h2>
            <p className="text-sm mb-4 text-white">
              Hantera systeminställningar och roller.
            </p>
            <button
              onClick={() => router.push("/admin/settings")}
              className="bg-[#d4bfa5] text-white px-4 py-2 rounded hover:bg-[#c6aa8c] transition"
            >
              Gå till inställningar
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
