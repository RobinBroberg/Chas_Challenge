"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addQuestion, deleteQuestion } from "@/services/api";
import { getQuestions, getCurrentUser } from "@/services/api";
import { RxCross2 } from "react-icons/rx";


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
      <div className="max-w-6xl mx-auto bg-white/20 backdrop-blur-xl border rounded-[5px] shadow p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Enkätfrågor
        </h1>
        <p className="text-sm md:text-lg font-medium text-white mb-12">
        Hantera enkätens innehåll – lägg till, redigera eller ta bort frågor.
        </p>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            placeholder="Ny fråga..."
            className="h-14 flex-1 border-2 border-white rounded px-4 text-white text-base focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-transparent transition"
          />
          <button
            onClick={handleAddQuestion}
            className="bg-gradient-to-r mb-3 from-[#5b6142] to-[#343a28] hover:from-[#6f7650] hover:to-[#3e4531] text-white font-medium py-4 px-4 rounded shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-fit"
          >
            Lägg till
          </button>
        </div>

        <div className="space-y-4 max-h-[450px] overflow-y-auto pr-6">
          {questions.map((q, index) => (
            <div key={q.id} className="max-w-8xl mx-auto flex items-center gap-4 bg-white/65 hover:bg-gray-100 transition-colors duration-200 px-8 py-3 rounded shadow-sm">
              <input
                type="text"
                value={q.question_text}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="flex-grow p-2 text-black font-semibold transition-colors"
              />
                 <button
        onClick={() => handleDeleteQuestion(q.id)}
        className="text-gray-600 hover:text-red-500 transition text-xl leading-none"
        title="Ta bort frågan"
      >
        <RxCross2 />
      </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
