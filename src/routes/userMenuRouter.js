import { Router } from 'express';
import { addDishToUserMenu, getUserMenu } from '../controllers/userController.js';

const router = Router();

router.post('/addMenu', addDishToUserMenu); 
router.get('/getMenu', getUserMenu); 

export default router;