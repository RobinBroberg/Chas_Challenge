"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser, addQuestion, deleteQuestion } from "@/utils/api";
import {
  fetchQuestions,
  getCurrentUser,
  logout,
  updateQuestions,
} from "@/utils/api";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState("");

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleQuestionChange = (index, newText) => {
    const updated = [...questions];
    updated[index].question_text = newText;
    setQuestions(updated);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateQuestions(questions);
      alert("Questions updated successfully!");
    } catch (err) {
      console.error("Failed to update questions:", err);
      alert("Failed to save questions.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddQuestion = async () => {
    if (!newQuestionText.trim()) return;

    try {
      const result = await addQuestion(newQuestionText);
      setQuestions([
        ...questions,
        { id: result.id, question_text: newQuestionText },
      ]);
      setNewQuestionText("");
    } catch (err) {
      console.error("Failed to add question:", err);
      alert("Failed to add question");
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Failed to delete question:", err);
      alert("Failed to delete question");
    }
  };

  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [regMsg, setRegMsg] = useState("");

  // Handles input change
  const handleNewUserInput = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Handles user registration
  const handleRegister = async () => {
    try {
      await registerUser(newUser);
      setRegMsg("User registered successfull");
      setNewUser({ first_name: "", last_name: "", email: "", password: "" });
    } catch (err) {
      console.error("Registration failed:", err);
      setRegMsg("Failed to register user: " + err.message);
    }
  };

  useEffect(() => {
    const load = async () => {
      const user = await getCurrentUser();
      if (!user || user.role !== "admin") {
        router.push("/login");
        return;
      }

      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (err) {
        console.error("Failed to load questions:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div
      className="w-full flex flex-col items-center justify-center bg-cover bg-center min-h-screen py-10"
      style={{ backgroundImage: "url('/loginpic.png')" }}
    >
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl space-y-4 shadow-md">
        <div className="mt-4">
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            Add New Question
          </h3>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              placeholder="New question..."
              className="flex-grow border border-gray-300 rounded p-2 text-gray-800"
            />
            <button
              onClick={handleAddQuestion}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
        <h1 className="text-xl font-bold mb-4 text-gray-800">Edit Questions</h1>

        {questions.map((q, index) => (
          <div key={q.id} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={q.question_text}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="flex-grow border border-gray-400 rounded p-2 text-gray-800 placeholder-gray-500"
            />
            <button
              onClick={() => handleDeleteQuestion(q.id)}
              className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}

        <div className="flex justify-between items-center">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {saving ? "Saving..." : "Save All"}
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="mt-10 p-4 bg-white rounded shadow-md">
        <h2 className="text-lg font-bold mb-2 text-gray-800">
          Test: Register a new worker
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-2">
          <input
            name="first_name"
            placeholder="First name"
            value={newUser.first_name}
            onChange={handleNewUserInput}
            className="p-2 border border-gray-300 rounded text-gray-800"
          />
          <input
            name="last_name"
            placeholder="Last name"
            value={newUser.last_name}
            onChange={handleNewUserInput}
            className="p-2 border border-gray-300 rounded text-gray-800"
          />
          <input
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleNewUserInput}
            className="p-2 border border-gray-300 rounded text-gray-800"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={newUser.password}
            onChange={handleNewUserInput}
            className="p-2 border border-gray-300 rounded text-gray-800"
          />
        </div>

        <button
          onClick={handleRegister}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register User
        </button>

        {regMsg && <p className="mt-2 text-sm text-gray-700">{regMsg}</p>}
      </div>
    </div>
  );
}
