import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header)
    return res.status(401).json({ error: "Falta header Authorization" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Token inválido" });
  }
}

