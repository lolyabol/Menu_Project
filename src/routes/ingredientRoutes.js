import express from 'express';
import { fetchAllIngredients, addIngredients } from '../controllers/ingredientController.js';

const router = express.Router();

router.get('/', fetchAllIngredients);
router.post('/', addIngredients);

export default router;