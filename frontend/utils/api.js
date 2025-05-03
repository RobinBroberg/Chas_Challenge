const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/**
 * Fetch all questions from the backend
 * @returns Array of questions: [{ id, question_text, created_at }]
 */
export async function fetchQuestions() {
  const res = await fetch(`${API_BASE}/questions`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  return await res.json();
}

/**
 * Log in a user and return role + userId
 * @param {string} email - user's email
 * @param {string} password - user's password
 * @returns {Promise<{ message: string, userId: number, role: string }>}
 */
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

/**
 * Fetch the currently logged-in user from the backend using the token cookie.
 *
 * This function makes a request to the `/me` endpoint and returns the user's
 * `userId` and `role` if the token is valid. It returns `null` if not authenticated.
 *
 * @returns {Promise<{ userId: number, role: string } | null>}
 */
export async function getCurrentUser() {
  const res = await fetch(`${API_BASE}/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) return null;
  return await res.json();
}
