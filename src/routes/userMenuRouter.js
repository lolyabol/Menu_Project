import { Router } from 'express';
import { addDishToMenu, getUserMenu } from '../controllers/userController.js';
import { removeDishFromMenu } from '../controllers/userController.js';

const router = Router();

router.post('/addMenu', addDishToMenu); 
router.get('/getMenu', getUserMenu); 
router.delete('/removeDish/:id', removeDishFromMenu);

export default router;