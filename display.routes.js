import express from 'express';
import { getDisplayByArea } from '../controllers/display.controller.js';
const router = express.Router();

router.get('/area/:areaId', getDisplayByArea);

export default router;
