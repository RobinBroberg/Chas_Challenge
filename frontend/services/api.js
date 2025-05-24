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
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to register user");
  }

  return data;
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

// Deduct a specified amount from the logged-in user's allowance
export async function deductAllowance(amount) {
  const res = await fetch(`${API_BASE}/allowance/deduct`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to deduct allowance");
  }

  return await res.json();
}

/**
 * Fetch all questions from the backend
 * @returns Array of questions: [{ id, question_text, created_at }]
 */
export async function getQuestions() {
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

/**
 * Submit answers for the current user
 * @param {Array} answers - Array of { question_id, answer_value }
 */
export async function postAnswers(answers) {
  const res = await fetch(`${API_BASE}/answers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(answers),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to submit answers");
  }

  return data;
}

/**
 * Fetch average answer scores for the admin's company
 * @returns Array of objects like: { question_id, question_text, average_score, total_answers }
 */
export async function getCompanyAverages() {
  const res = await fetch(`${API_BASE}/answers/average`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch averages");
  }

  return data;
}

/**
 * Fetch the latest average score and total number of users
 * who have submitted answers for the logged-in admin's company.
 * Only accessible to admins.
 *
 * @returns {Object} - { averageScore: number, totalUsers: number }
 */
export async function getOverallCompanyAverage() {
  const res = await fetch(`${API_BASE}/answers/average/overall`, {
    method: "GET",
    credentials: "include",
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Failed: ${text || res.status}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Failed to parse JSON");
  }
}

/**
 * Fetch the latest average score and total number of users
 * who have submitted answers for the logged-in admin's company.
 * Admins only.
 *
 * @returns {Object} - {
 *   averageScore: number | null,
 *   totalUsers: number
 * }
 */
export async function getLatestCompanyAverage() {
  const res = await fetch(`${API_BASE}/answers/average/latest`, {
    method: "GET",
    credentials: "include",
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Failed: ${text || res.status}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Failed to parse JSON");
  }
}

export async function uploadReceipt(file) {
  const formData = new FormData();
  formData.append("receipt", file);

  const res = await fetch(`${API_BASE}/receipts/upload`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to upload receipt");
  }

  return await res.json();
}

export async function getAllReceipts() {
  const res = await fetch(`${API_BASE}/receipts`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch receipts");

  return await res.json();
}

export async function getPendingReceipts() {
  const res = await fetch(`${API_BASE}/receipts`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch receipts");

  const all = await res.json();
  return all.filter((r) => r.status === "pending");
}

export async function approveReceipt(receiptId) {
  const res = await fetch(`${API_BASE}/receipts/${receiptId}/approve`, {
    method: "PATCH",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Kunde inte godkänna kvittot");
  }

  return await res.json();
}

export async function rejectReceipt(receiptId, reason) {
  const res = await fetch(`${API_BASE}/receipts/${receiptId}/reject`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reason }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Kunde inte avvisa kvittot");
  }

  return await res.json();
}
