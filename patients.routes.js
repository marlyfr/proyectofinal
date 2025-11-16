import express from "express";
import {
  createPatient,
  getPatient,
  listPatients,
  updatePatient,
  deletePatient
} from "../controllers/patients.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// RUTAS DE PACIENTES
// Si deseas protegerlas con token, solo quita los comentarios del middleware

router.post("/", /* authMiddleware, */ createPatient);
router.get("/", /* authMiddleware, */ listPatients);
router.get("/:id", /* authMiddleware, */ getPatient);
router.put("/:id", /* authMiddleware, */ updatePatient);
router.delete("/:id", /* authMiddleware, */ deletePatient);

export default router;
