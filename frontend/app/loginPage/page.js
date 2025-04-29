"use client"
import React, { useState } from 'react';


const loginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implementera logik för inloggning
    console.log('Logga in', username, password);
  };

  const handleCreateAccount = () => {
    // Implementera logik för att skapa konto
    console.log('Skapa konto');
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/loginpic.png')" }}
    >

      <div className="flex flex-col space-y-6 mb-30">
        <h2 className="text-4xl font-medium text-left mb-18"
        style={{ color: '#F6F4F0' }}
        >Logga in</h2>

        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
            style={{ color: '#47423E' }}
          >
            Logga in
          </button>

          <button
            onClick={handleCreateAccount}
            className="px-27 py-4 bg-gray-300 text-white rounded-full hover:bg-gray-400 transition font-bold text-lg"
            style={{ color: '#47423E' }}
          >
            Skapa konto
          </button>
        </div>
      </div>
    </div>
  );
};

export default loginPage;
