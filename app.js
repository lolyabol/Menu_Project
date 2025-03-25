import express from 'express';
import session from 'express-session';
import User from './src/models/User.js';
import Dish from './src/models/Dish.js';
import sequelize from './src/db.js';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import registration from './src/controllers/registrationController.js';
import loginRouter from './src/routes/loginRouter.js';
import ingredientRoutes from './routes/ingredientRoutes.js';
import mainRouter from './src/routes/mainRouter.js';
import crypto from 'crypto';
import Ingredient from './src/models/Ingredient.js';
import cors from 'cors'; 

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

// Определение маршрутов
// app.post('/ingredients', (req, res, next) => {
//     console.log('POST /ingredients', req.body); 
//     next();
// }, addIngredient);
// app.post('/dishes', (req, res, next) => {
//     console.log('POST /dishes', req.body); 
//     next();
// }, addIngredient);
app.use('/ingredients', ingredientRoutes);
const { RegistrationPage, registrationController } = registration; 
app.get('/', RegistrationPage);
app.use('/registration', registrationController);
app.use('/login', loginRouter);
app.use('/main', mainRouter);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Подключение к SQLite успешно!');
        await User.sync();
        await Dish.sync();
        await Ingredient.sync();
        app.listen(PORT, () => {
            console.log(`Сервер запущен на http://localhost:${PORT}`); 
        });
    } catch (error) {
        console.error('Не удалось подключиться к базе данных:', error);
    }
};

startServer();

export default app;
