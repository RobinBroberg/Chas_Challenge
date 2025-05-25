"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addQuestion, deleteQuestion } from "@/services/api";
import { getQuestions, getCurrentUser } from "@/services/api";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newQuestionText, setNewQuestionText] = useState("");

  const router = useRouter();

  const handleQuestionChange = (index, newText) => {
    const updated = [...questions];
    updated[index].question_text = newText;
    setQuestions(updated);
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
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Failed to delete question:", err);
      alert("Failed to delete question");
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
        const data = await getQuestions();
        setQuestions(data);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-[#EAE9E4] min-h-screen p-4 md:p-10 font-montserrat">
      <div className="max-w-4xl mx-auto bg-white border rounded-[5px]  shadow p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Hantera frågor
        </h1>
        <p className="text-sm md:text-lg font-semibold text-gray-800 mb-6">
          Lägg till, redigera eller ta bort frågor
        </p>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            placeholder="Ny fråga..."
            className="flex-grow border border-gray-300 rounded p-2 text-gray-800"
          />
          <button
            onClick={handleAddQuestion}
            className="px-4 py-2 bg-[#4A5A41] text-white rounded hover:bg-[#3b4835]"
          >
            Lägg till
          </button>
        </div>

        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={q.id} className="flex items-center gap-2">
              <input
                type="text"
                value={q.question_text}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="flex-grow border border-gray-300 rounded p-2 text-gray-800 font-semibold"
              />
              <button
                onClick={() => handleDeleteQuestion(q.id)}
                className="px-3 py-2 bg-[#C55345] text-white rounded hover:bg-[#a94135]"
              >
                Ta bort
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
