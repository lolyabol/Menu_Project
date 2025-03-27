import { Router } from 'express';
import { HomePage } from '../controllers/homeController.js';
import { AboutPage } from '../controllers/aboutController.js';
import { CalorieCalculatorPage } from '../controllers/calorieController.js';
import { MenuConstructorPage } from '../controllers/menuConstructorController.js';
import { UserMenuPage } from '../controllers/userMenuController.js';
import { addDish } from '../controllers/dishController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js'; 

const router = Router();

router.get('/', isAuthenticated, HomePage); 
router.get('/about', isAuthenticated, AboutPage);
router.get('/calorieCalculator', isAuthenticated, CalorieCalculatorPage);
router.get('/menuConstructor', isAuthenticated, MenuConstructorPage, addDish);
router.get('/userMenu', isAuthenticated, UserMenuPage);

router.get('/ingredient', (req, res) => {
    res.send('Страница ингредиентов'); 
});

router.get('/home', isAuthenticated, HomePage);

router.use((req, res) => {
    res.status(404).send('Страница не найдена');
});

export default router;
