const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Log in a user and return role + userId
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
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
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }
}

// Fetch the currently logged-in user from the backend using the token cookie.
export async function getCurrentUser() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) return null;
  return await res.json();
}

// Register a new user (worker) under the admin's company
export async function registerUser(userData) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Only admins can register users");
  }

  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      ...userData,
      company_id: currentUser.company_id,
      role: "user", // always force 'user'
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to register user");
  }

  return data; // { message: "User registered successfully" }
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
  const res = await fetch(`${API_BASE}/allowance/user/${userId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user allowance");
  }

  return await res.json();
}

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

// Update multiple questions
export async function updateQuestions(updates) {
  const res = await fetch(`${API_BASE}/questions`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(updates),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update questions");
  }

  return data;
}

/**
 * Add a new question to the backend
 * @param {string} questionText - The text of the new question
 * @returns {Object} - { message, id }
 */
export async function addQuestion(questionText) {
  const res = await fetch(`${API_BASE}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ question_text: questionText }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to add question");
  }

  return data;
}

/**
 * Delete a question by ID
 * @param {number} id - ID of the question to delete
 */
export async function deleteQuestion(id) {
  const res = await fetch(`${API_BASE}/questions/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete question");
  }

  return data;
}
