import express from "express";
import {
  createArea,
  listAreas,
  getArea,
  updateArea,
  deleteArea
} from "./areas.controller.js";

const router = express.Router();

router.post("/", createArea);
router.get("/", listAreas);
router.get("/:id", getArea);
router.put("/:id", updateArea);
router.delete("/:id", deleteArea);

export default router;
