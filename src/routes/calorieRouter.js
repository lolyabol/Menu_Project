import express from 'express';
import { updateCalorieIntake } from '../controllers/calorieController.js';

const router = express.Router();

router.post('/updateCalorieIntake', updateCalorieIntake);

export default router;

