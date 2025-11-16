import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// DB
import pool from "./src/db/db.js";

// ROUTES
import authRoutes from "./src/routes/auth.routes.js";
import areasRoutes from "./src/routes/areas.routes.js";
import patientsRoutes from "./src/routes/patients.routes.js";
import turnsRoutes from "./src/routes/turns.routes.js";
import displayRoutes from "./src/routes/display.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// ===========================
// 🔥 TEST DE CONEXIÓN A BD 🔥
// ===========================
pool
  .query("SELECT NOW()")
  .then((res) => console.log("🟢 PostgreSQL conectado:", res.rows[0].now))
  .catch((err) =>
    console.error("🔴 Error PostgreSQL:", err.message)
  );

// ===========================
// RUTAS
// ===========================
app.use("/api/auth", authRoutes);
app.use("/api/areas", areasRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/turns", turnsRoutes);
app.use("/api/display", displayRoutes);

app.get("/", (req, res) => {
  res.send(
    "<h1>🚀 Sistema de Colas – API Activa</h1><p>Bienvenido a la API.</p>"
  );
});

// ===========================
// SERVIDOR
// ===========================
app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en puerto 3000");
});
