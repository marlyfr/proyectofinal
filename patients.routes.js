import express from "express";
import {
  createPatient,
  listPatients,
  getPatient,
  updatePatient,
  deletePatient
} from "./patients.controller.js";

const router = express.Router();

router.post("/", createPatient);
router.get("/", listPatients);
router.get("/:id", getPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
