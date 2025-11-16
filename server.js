import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import pool from "./db.js";

import authRoutes from "./auth.routes.js";
import areasRoutes from "./areas.routes.js";
import patientsRoutes from "./patients.routes.js";
import turnsRoutes from "./turns.routes.js";
import displayRoutes from "./display.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Test de conexión
pool.query("SELECT NOW()")
  .then(res => console.log("🟢 PostgreSQL conectado:", res.rows[0].now))
  .catch(err => console.error("🔴 Error PostgreSQL:", err.message));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/areas", areasRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/turns", turnsRoutes);
app.use("/api/display", displayRoutes);

app.get("/", (req, res) => {
  res.send("<h1>API Activa</h1>");
});

// Render usa process.env.PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

