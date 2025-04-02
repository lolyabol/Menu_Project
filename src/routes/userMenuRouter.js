import { Router } from 'express';
import { addDishToMenu, getUserMenu } from '../controllers/userController.js';
import { removeDishFromMenu, getDishWithIngredients } from '../controllers/userController.js';

const router = Router();

router.post('/addMenu', addDishToMenu); 
router.get('/getMenu', getUserMenu); 
router.delete('/removeDish/:id', removeDishFromMenu);
router.get('/:dishId', getDishWithIngredients);

export default router;