import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;

    // No viene el header
    if (!header) {
      return res.status(401).json({ message: "Token requerido" });
    }

    // Formato: "Bearer TOKEN"
    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Formato de token inválido" });
    }

    const token = parts[1];

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardar datos del usuario en req.user
    req.user = decoded; // { id, email, rol }

    next();

  } catch (err) {
    console.error("authMiddleware error:", err);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}
