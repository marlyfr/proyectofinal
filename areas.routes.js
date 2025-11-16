import express from "express";
import {
  createArea,
  listAreas,
  getArea,
  updateArea,
  deleteArea
} from "../controllers/areas.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Cuando estés lista, quita los comentarios para activar JWT
router.post("/", /* authMiddleware, */ createArea);
router.get("/", /* authMiddleware, */ listAreas);
router.get("/:id", /* authMiddleware, */ getArea);
router.put("/:id", /* authMiddleware, */ updateArea);
router.delete("/:id", /* authMiddleware, */ deleteArea);

export default router;
