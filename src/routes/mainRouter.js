import { Router } from 'express';
import { showHomePage } from '../controllers/homeController.js';
import { showAboutPage } from '../controllers/aboutController.js';
import { showCalorieCalculatorPage } from '../controllers/calorieController.js';
import { showMenuConstructorPage } from '../controllers/menuConstructorController.js';
import { showUserMenuPage } from '../controllers/userMenuController.js';

const router = Router();

router.get('/', showHomePage); 
router.get('/about', showAboutPage);
router.get('/calorieCalculator', showCalorieCalculatorPage);
router.get('/menuConstructor', showMenuConstructorPage);
router.get('/userMenu', showUserMenuPage);
router.get('/home', showHomePage);

router.use((req, res) => {
    res.status(404).send('Страница не найдена');
});

export default router;

