import express from "express";
import {
  createTurn,
  getNextTurn,
  callTurn,
  startTurn,
  finishTurn,
  listTurns
} from "../controllers/turns.controller.js";

const router = express.Router();

// Crear un turno
router.post("/", createTurn);

// Listar turnos (opcional ?areaId=1)
router.get("/", listTurns);

// Obtener siguiente turno en espera por área
router.get("/next/:areaId", getNextTurn);

// Cambiar estado del turno → Llamando
router.post("/call/:idTurno", callTurn);

// Cambiar estado del turno → Atendiendo
router.post("/start/:idTurno", startTurn);

// Cambiar estado del turno → Finalizado
router.post("/finish/:idTurno", finishTurn);

export default router;
