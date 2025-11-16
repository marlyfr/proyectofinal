import express from "express";
import {
  createTurn,
  listTurns,
  getTurn,
  updateTurn,
  deleteTurn
} from "./turns.controller.js";

const router = express.Router();

router.post("/", createTurn);
router.get("/", listTurns);
router.get("/:id", getTurn);
router.put("/:id", updateTurn);
router.delete("/:id", deleteTurn);

export default router;
