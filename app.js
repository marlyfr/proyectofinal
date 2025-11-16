import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// DB
import pool from "./db.js";

// ROUTES
import authRoutes from "./auth.routes.js";
import areasRoutes from "./areas.routes.js";
import patientsRoutes from "./patients.routes.js";
import turnsRoutes from "./turns.routes.js";
import displayRoutes from "./display.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// TEST BD
pool
  .query("SELECT NOW()")
  .then(res => console.log("🟢 PostgreSQL conectado:", res.rows[0].now))
  .catch(err => console.error("🔴 Error PostgreSQL:", err.message));

// RUTAS
app.use("/api/auth", authRoutes);
app.use("/api/areas", areasRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/turns", turnsRoutes);
app.use("/api/display", displayRoutes);

app.get("/", (req, res) => {
  res.send("<h1>🚀 API Activa</h1>");
});

export default app;
