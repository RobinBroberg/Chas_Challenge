// middleware.js
import jwt from "jsonwebtoken";

// Middleware för att kräva att användaren är autentiserad
export function requireAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token provided in the request");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifiera token
    req.user = decoded; // Lägg till användarinformationen i request-objektet
    next(); // Fortsätt till nästa middleware eller rutt
  } catch (err) {
    console.log("Token verification failed:", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

// Middleware för att kräva att användaren har rätt roll
export function requireRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user) {
      console.log("No user in request object");
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    if (req.user.role !== requiredRole) {
      console.log(`User does not have the required role: ${requiredRole}`);
      return res
        .status(403)
        .json({ message: `Forbidden: Requires ${requiredRole} role` });
    }

    next(); // Om användaren har rätt roll, fortsätt till nästa middleware eller rutt
  };
}
