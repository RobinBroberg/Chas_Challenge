"use client";
import React, { useState } from "react";

const UserManagement = () => {
  const [userList, setUserList] = useState([
    { id: 1, name: "Anna Svensson", role: "HR" },
    { id: 2, name: "Erik Johansson", role: "Medarbetare" },
  ]);

  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState("HR");
  const [errorMessage, setErrorMessage] = useState("");

  // Ta bort användare
  const deleteUser = (id) => {
    setUserList(userList.filter((user) => user.id !== id));
  };

  // Lägg till användare
  const addUser = () => {
    if (newUserName.trim() === "") {
      setErrorMessage("Användarnamn kan inte vara tomt.");
      return;
    }

    const newUser = {
      id: userList.length + 1,
      name: newUserName,
      role: newUserRole,
    };

    setUserList([...userList, newUser]);
    setNewUserName("");
    setNewUserRole("HR");
    setErrorMessage(""); // Rensa felmeddelande
  };

  return (
    <div className="bg-[#2a2a2a] p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-white"></h2>{" "}
      {/* Förbättrad header */}
      {/* Felmeddelande */}
      {errorMessage && (
        <div className="bg-red-600 text-white p-2 rounded mb-4">
          {errorMessage}
        </div>
      )}
      {/* Formulär för att skapa en ny användare */}
      <div className="space-y-4">
        <div>
          <label className="text-white block mb-1" htmlFor="username">
            Användarnamn
          </label>
          <input
            type="text"
            id="username"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Skriv användarnamn"
            className="bg-[#47423E] text-white p-3 rounded w-full focus:outline-none"
          />
        </div>

        <div>
          <label className="text-white block mb-1" htmlFor="role">
            Roll
          </label>
          <select
            id="role"
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
            className="bg-[#47423E] text-white p-3 rounded w-full focus:outline-none"
          >
            <option value="HR">HR</option>
            <option value="Medarbetare">Medarbetare</option>
          </select>
        </div>

        <button
          onClick={addUser}
          className="bg-[#d4bfa5] text-white px-6 py-3 rounded-full w-full hover:bg-[#c6aa8c] transition"
        >
          Lägg till användare
        </button>
      </div>
      {/* Lista över användare */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white">Användarlista</h3>

        <table className="min-w-full text-white mt-4">
          <thead>
            <tr>
              <th className="px-6 py-3">Namn</th>
              <th className="px-6 py-3">Roll</th>
              <th className="px-6 py-3">Åtgärd</th>
            </tr>
          </thead>
          <tbody>
            {userList.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-white py-4">
                  Inga användare tillagda.
                </td>
              </tr>
            ) : (
              userList.map((user) => (
                <tr key={user.id} className="border-t border-[#47423E]">
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.role}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                      Ta bort
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
