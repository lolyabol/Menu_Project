import express from 'express';
import session from 'express-session';
import User from './src/models/User.js';
import Dish from './src/models/Dish.js'; 
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import registration from './src/controllers/registrationController.js';
import loginRouter from './src/routes/loginRouter.js';
import mainRouter from './src/routes/mainRouter.js';
import crypto from 'crypto';
import Ingredient from './src/models/Ingredient.js';
import cors from 'cors'; 
import connectDB from './src/db.js'; 
import registrationRouter from './src/routes/registrationRouter.js';
import ingredientRoutes from './src/routes/ingredientRoutes.js';
import calorieRouter from './src/routes/calorieRouter.js'
import userMenuRouter from './src/routes/userMenuRouter.js'
import dishRoutes from './src/routes/dishRoutes.js';
import morgan from 'morgan'; 
import { isAuthenticated } from './src/middleware/authMiddleware.js'; 

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
    partialsDir: join(__dirname, 'src/views/'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));

app.set('view engine', 'hbs');
app.set('views', join(__dirname, 'src/views'));
app.use(express.static(join(__dirname, 'public'))); 

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.use(cors()); 
app.use(morgan('dev')); 

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

const { RegistrationPage } = registration; 
app.get('/', RegistrationPage);
app.post('/updateCalorieIntake', isAuthenticated, async (req, res) => {
    const { calories } = req.body;

    // Проверьте, что calories существует и является числом
    if (typeof calories !== 'number') {
        return res.status(400).send({ message: 'Неверные данные' });
    }

    try {
        // Обновляем поле dailyCalorieIntake у текущего пользователя
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({ message: 'Пользователь не найден' });
        }

        user.dailyCalorieIntake = calories;
        await user.save(); // Сохраняем изменения

        res.status(200).send({ message: 'Данные успешно обновлены' });
    } catch (error) {
        console.error(error); // Выводим ошибку в консоль для отладки
        res.status(500).send({ message: 'Ошибка при обновлении данных' });
    }
});

app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/main', mainRouter);

app.use('/ingredients', ingredientRoutes);
app.use('/dishes', dishRoutes); 
app.use('/menu', isAuthenticated, userMenuRouter)

app.use((req, res) => {
    res.status(404).send('Страница не найдена');
});

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