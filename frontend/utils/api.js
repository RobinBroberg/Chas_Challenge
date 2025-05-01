const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/**
 * Fetch all questions from the backend
 * @returns Array of questions: [{ id, question_text, created_at }]
 */
export async function fetchQuestions() {
  const res = await fetch(`${API_BASE}/questions`, {
    method: "GET",
    credentials: "include", // include cookies if needed
  });

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  return await res.json();
}
