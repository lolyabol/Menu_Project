import { Router } from 'express';
import { HomePage } from '../controllers/homeController.js';
import { AboutPage } from '../controllers/aboutController.js';
import { CalorieCalculatorPage } from '../controllers/calorieController.js';
import { MenuConstructorPage } from '../controllers/menuConstructorController.js';
import { UserMenuPage } from '../controllers/userMenuController.js';

const router = Router();

router.get('/', HomePage); 
router.get('/about', AboutPage);
router.get('/calorieCalculator', CalorieCalculatorPage);
router.get('/menuConstructor', MenuConstructorPage)
router.get('/userMenu', UserMenuPage);
router.get('/home', HomePage);

router.use((req, res) => {
    res.status(404).send('Страница не найдена');
});

export default router;
