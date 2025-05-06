// in i backend:

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.json({ message: "Logout successful" });
});

// frontend:
async function logout() {
  try {
    const response = await fetch("/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      console.log("Logout successful");
      window.location.href = "/login";
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

return (
  <button
    onClick={logout}
    className="px-27 py-4 bg-gray-300 text-white rounded-full hover:bg-gray-400 transition font-bold text-lg"
    style={{ color: "#47423E" }}
  >
    Logga ut
  </button>
);
