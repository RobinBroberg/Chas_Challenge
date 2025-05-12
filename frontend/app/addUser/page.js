// frontend/app/addUser/page.js
"use client";

import React, { useState } from "react";

const PrimaryButton = ({ children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="bg-[#d4bfa5] text-white px-6 py-3 rounded-full w-full hover:bg-[#c6aa8c] transition font-semibold disabled:opacity-50"
  >
    {children}
  </button>
);

const AddUser = () => {
  const [newUserName, setNewUserName] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userList, setUserList] = useState([]);

  const resetForm = () => {
    setNewUserName("");
    setNewUserPassword("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const addUser = async () => {
    if (newUserName.trim() === "" || newUserPassword.trim() === "") {
      setErrorMessage("Användarnamn och lösenord krävs.");
      return;
    }

    const newUser = {
      name: newUserName,
      password: newUserPassword,
    };

    // Hämta din autentiseringstoken från localStorage
    const yourAuthToken = localStorage.getItem("authToken");

    // Kontrollera om token finns, om inte visa ett felmeddelande
    if (!yourAuthToken) {
      setErrorMessage("Ingen autentiseringstoken hittades.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourAuthToken}`, // Lägg till token för autentisering
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        setUserList([...userList, { ...newUser, id: Date.now() }]);
        setSuccessMessage("Användare tillagd.");
        resetForm();
      } else {
        setErrorMessage(data.message || "Något gick fel.");
      }
    } catch (error) {
      setErrorMessage("Kunde inte ansluta till servern.");
    }
  };

  return (
    <div className="bg-[#2a2a2a] p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-white text-center">
        Skapa Ny Användare
      </h2>

      {errorMessage && (
        <div className="bg-red-600 text-white p-2 rounded mb-4">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-600 text-white p-2 rounded mb-4">
          {successMessage}
        </div>
      )}

      <div className="space-y-4 mb-8">
        <div>
          <label className="text-white block mb-1">Användarnamn</label>
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Skriv användarnamn"
            className="bg-[#47423E] text-white p-3 rounded w-full focus:outline-none"
          />
        </div>

        <div>
          <label className="text-white block mb-1">Lösenord</label>
          <input
            type="password"
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
            placeholder="Skriv lösenord"
            className="bg-[#47423E] text-white p-3 rounded w-full focus:outline-none"
          />
        </div>

        <PrimaryButton onClick={addUser}>Lägg till användare</PrimaryButton>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white mb-4">Användarlista</h3>
        <table className="min-w-full text-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Namn</th>
            </tr>
          </thead>
          <tbody>
            {userList.length === 0 ? (
              <tr>
                <td className="text-center py-4 text-gray-300">
                  Inga användare ännu.
                </td>
              </tr>
            ) : (
              userList.map((user) => (
                <tr key={user.id} className="border-t border-[#47423E]">
                  <td className="px-6 py-3">{user.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddUser;
