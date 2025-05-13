"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, updateUserInfo } from "@/services/api";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData);
          setFirstName(userData.first_name || "");
          setLastName(userData.last_name || "");
          setEmail(userData.email || "");
        } else {
          setError("Kunde inte hämta användardata.");
        }
      } catch (err) {
        console.error(err);
        setError("Ett fel uppstod vid hämtning av användare.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      await updateUserInfo({
        first_name: firstName,
        last_name: lastName,
        email: email,
      });
      setMessage("Dina uppgifter har sparats.");
    } catch (err) {
      console.error(err);
      setError(err.message || "Misslyckades att spara ändringar.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1e1e1e] text-white">
        <p>Laddar användare...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1e1e1e] text-red-500">
        <p>{error}</p>
      </div>
    );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/loginpic.png')" }}
    >
      <div className="min-h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
        <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-xl w-full">
          <h1 className="text-3xl font-bold mb-6 text-[#2a2a2a]">
            Inställningar
          </h1>

          {message && <p className="text-green-600 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Förnamn
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c6aa8c]"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Efternamn
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c6aa8c]"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium text-gray-700">
              E-postadress
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c6aa8c]"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className={`w-full py-2 text-white font-semibold rounded transition ${
              saving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#d4bfa5] hover:bg-[#c6aa8c]"
            }`}
          >
            {saving ? "Sparar..." : "Spara ändringar"}
          </button>
        </div>
      </div>
    </div>
  );
}
