import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded user:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}
