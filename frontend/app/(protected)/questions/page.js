"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchQuestions, getCurrentUser } from "@/utils/api";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
