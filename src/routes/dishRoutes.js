import { Router } from 'express';
import { filterDishes, addDish } from '../controllers/dishController.js';

const router = Router();

router.post('/filter', filterDishes);
router.post('/add', addDish);

export default router;