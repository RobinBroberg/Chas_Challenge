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

// Log in a user and return role + userId
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

// Logs out the currently authenticated user by clearing the auth cookie.
export async function logout() {
  const res = await fetch(`${API_BASE}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }
}

// Fetch the currently logged-in user from the backend using the token cookie.
export async function getCurrentUser() {
  const res = await fetch(`${API_BASE}/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) return null;
  return await res.json();
}

// Get the logged-in user's wellness allowance
export async function getAllowance() {
  const res = await fetch(`${API_BASE}/allowance`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch allowance");
  }

  return await res.json();
}

// Get the wellness allowance for a specific user (admin only)
export async function getUserAllowance(userId) {
  const res = await fetch(`${API_BASE}/users/${userId}/allowance`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user allowance");
  }

  return await res.json();
}
