import express from "express";
import {
  createTurn,
  listTurns,
  getTurn,
  updateTurn,
  deleteTurn,
  callNextTurn
} from "./turns.controller.js";

const router = express.Router();

router.post("/", createTurn);
router.get("/", listTurns);
router.get("/:id", getTurn);
router.put("/:id", updateTurn);
router.delete("/:id", deleteTurn);

// Especial
router.post("/next", callNextTurn);

export default router;
