import express from 'express';
import { addDish } from '../controllers/dishController.js';

const router = express.Router();

router.post('/dishes', addDish);

export default router;
