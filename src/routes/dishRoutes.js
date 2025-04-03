import { Router } from 'express';
import { filterDishes, addDish, renderMenuPage } from '../controllers/dishController.js';

const router = Router();

router.get('/menu', renderMenuPage);
router.post('/filter', filterDishes);
router.post('/add', addDish);


export default router;