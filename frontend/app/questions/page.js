"use client";

import { useEffect, useState } from "react";
import { fetchQuestions } from "@/utils/api";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/loginpic.png')" }}
    >
      <div>
        {questions.map((q) => (
          <p key={q.id}>{q.question_text}</p>
        ))}
      </div>
    </div>
  );
}
