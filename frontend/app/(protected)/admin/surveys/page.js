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
    <div
    className="flex flex-col min-h-screen bg-cover bg-center"
    style={{ backgroundImage: 'url("/EmployeeBG.png")' }}
  >
    
    <div className="min-h-screen p-4 md:p-15 font-montserrat">
      <div className="max-w-6xl mx-auto bg-white/85 border rounded-[5px]  shadow p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Enkätfrågor
        </h1>
        <p className="text-sm md:text-lg font-medium text-gray-800 mb-12">
        Hantera enkätens innehåll – lägg till, redigera eller ta bort frågor.
        </p>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            placeholder="Ny fråga..."
            className="h-14 flex-1 border-2 border-gray-800 rounded px-4 text-gray-900 text-base"
          />
          <button
            onClick={handleAddQuestion}
            className="bg-gradient-to-r mb-3 from-[#5b6142] to-[#343a28] hover:from-[#6f7650] hover:to-[#3e4531] text-white font-medium py-4 px-4 rounded shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-fit"
          >
            Lägg till
          </button>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-10">
          {questions.map((q, index) => (
            <div key={q.id} className="flex items-center gap-6">
              <input
                type="text"
                value={q.question_text}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="flex-grow border border-gray-700 rounded p-2 text-gray-800 font-semibold"
              />
              <button
                onClick={() => handleDeleteQuestion(q.id)}
                className="px-4 py-2 bg-[#C55345] text-white rounded hover:bg-[#a94135]"
              >
                Ta bort
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
