import express from 'express';
import session from 'express-session';
import User from './src/models/User.js';
import Dish from './src/models/Dish.js';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import registration from './src/controllers/registrationController.js';
import loginRouter from './src/routes/loginRouter.js';
import { addIngredient } from './src/controllers/ingredientController.js';
import { addDish } from './src/controllers/dishController.js';
import mainRouter from './src/routes/mainRouter.js';
import crypto from 'crypto';
import Ingredient from './src/models/Ingredient.js';
import cors from 'cors'; 
import connectDB from './src/db.js'; 
import registrationRouter from './src/routes/registrationRouter.js';

const app = express(); 
const PORT = process.env.PORT || 3000;

const secret = crypto.randomBytes(64).toString('hex'); 
console.log(secret);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: join(__dirname, 'src/views/layouts/'),
    partialsDir: join(__dirname, 'src/views/')
}));

app.set('view engine', 'hbs');
app.set('views', join(__dirname, 'src/views'));
app.use(express.static(join(__dirname, 'public'))); 

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.use(cors()); 

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`); 
    next();
});

app.post('/ingredients', (req, res, next) => {
    console.log('POST /ingredients', req.body); 
    next();
}, addIngredient);

app.post('/dishes', addDish);
app.post('/api/dishes', (req, res) => {
    const { name, calories, description, ingredients } = req.body;

    if (!name || !calories || !description || !ingredients) {
        return res.status(400).json({ message: 'Недостаточно данных' });
    }

    try {

        console.log('Полученные данные:', req.body);

        res.status(200).json({
            message: 'Блюдо успешно добавлено',
            dish: {
                name,
                calories,
                description,
                ingredients
            }
        });
    } catch (error) {
        console.error('Ошибка при обработке данных:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});


const { RegistrationPage, registrationController } = registration; 
app.get('/', RegistrationPage);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/main', mainRouter);

const startServer = async () => {
    await connectDB(); 

    await User.syncIndexes();
    await Dish.syncIndexes();
    await Ingredient.syncIndexes();

    app.listen(PORT, () => {
        console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
};

startServer();

export default app;
