import express from 'express';
import { fetchAllIngredients, addIngredients, getIngredientsByDishId } from '../controllers/ingredientController.js';

const router = express.Router();

router.get('/', fetchAllIngredients);
router.post('/', addIngredients);
router.get('/getIngredients', getIngredientsByDishId);

export default router;