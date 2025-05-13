"use client";

import { useEffect, useState } from "react";
import { getQuestions, postAnswers } from "@/services/api";

export default function SurveyPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (err) {
        console.error("Kunde inte hämta frågor", err);
      }
    }
    fetchData();
  }, []);

  const handleAnswerChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = async () => {
    try {
      const formatted = Object.entries(answers).map(([id, value]) => ({
        question_id: parseInt(id),
        answer_value: parseInt(value),
      }));
      await postAnswers(formatted);
      setMessage("Svar skickade!");
    } catch (err) {
      setMessage("Fel vid skickande av svar.");
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-12"
      style={{ backgroundImage: "url('/loginpic.png')" }}
    >
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Balansundersökning
        </h1>

        {questions.map((q) => (
          <div key={q.id} className="mb-5">
            <p className="font-medium text-gray-700 mb-1">{q.question_text}</p>
            <input
              type="number"
              min={1}
              max={10}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-lg px-2 py-1"
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-full font-bold text-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          🚀 Skicka dina svar
        </button>

        {message && (
          <p className="text-center mt-4 font-medium text-green-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
