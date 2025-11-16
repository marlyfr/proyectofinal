import express from "express";
import { getDisplayTurns } from "./display.controller.js";

const router = express.Router();

router.get("/", getDisplayTurns);

export default router;
