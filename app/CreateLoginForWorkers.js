import React from "react";

export default function CreateLoginForWorkers() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/hr.chef.jpg.jpg)" }} // Sätt bakgrundsbilden här
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-[#4e4a45]">
            Skapa Konto för Medarbetare
          </h2>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-[#6d665e]"
              >
                Förnamn
              </label>
              <input
                type="text"
                id="first-name"
                name="first-name"
                required
                className="w-full p-3 mt-2 border border-[#d4bfa5] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d4bfa5] focus:border-[#b9a38a]"
                placeholder="Förnamn"
              />
            </div>

            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-[#6d665e]"
              >
                Efternamn
              </label>
              <input
                type="text"
                id="last-name"
                name="last-name"
                required
                className="w-full p-3 mt-2 border border-[#d4bfa5] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d4bfa5] focus:border-[#b9a38a]"
                placeholder="Efternamn"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#6d665e]"
              >
                Epostadress
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-3 mt-2 border border-[#d4bfa5] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d4bfa5] focus:border-[#b9a38a]"
                placeholder="Epostadress"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#6d665e]"
              >
                Användarnamn
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full p-3 mt-2 border border-[#d4bfa5] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d4bfa5] focus:border-[#b9a38a]"
                placeholder="Användarnamn"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#6d665e]"
              >
                Lösenord
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full p-3 mt-2 border border-[#d4bfa5] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d4bfa5] focus:border-[#b9a38a]"
                placeholder="Lösenord"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 mt-4 bg-[#d4bfa5] text-white font-semibold rounded-lg shadow-md hover:bg-[#c6aa8c] transition"
              >
                Skapa konto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
