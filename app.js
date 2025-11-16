import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// DB (esto carga la conexión automáticamente)
import pool from "./src/db/db.js";

// Rutas
import authRoutes from "./src/routes/auth.routes.js";
import areasRoutes from "./src/routes/areas.routes.js";
import patientsRoutes from "./src/routes/patients.routes.js";
import turnsRoutes from "./src/routes/turns.routes.js";
import displayRoutes from "./src/routes/display.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// -------- RUTAS ----------
app.use("/api/auth", authRoutes);
app.use("/api/areas", areasRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/turns", turnsRoutes);
app.use("/api/display", displayRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.send("<h1>🚀 API Sistemas de Colas Activa</h1>");
});

// ---------- SERVIDOR ----------
app.listen(3000, () => {
  console.log("🚀 Servidor ejecutándose en http://localhost:3000");
});
