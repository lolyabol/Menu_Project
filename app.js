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
import mainRouter from './src/routes/mainRouter.js';
import crypto from 'crypto';

const secret = crypto.randomBytes(64).toString('hex');
console.log(secret);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const { showRegistrationPage, registerController } = registration;

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: join(__dirname, 'src/views/layouts/'),
    partialsDir: join(__dirname, 'src/views/')
}));
app.use(express.static(join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', join(__dirname, 'src/views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.get('/', showRegistrationPage);
app.use('/registration', registerController);
app.use('/login', loginRouter);
app.use('/main', mainRouter);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Подключение к SQLite успешно!');
        await User.sync();
        await Dish.sync();
        app.listen(PORT, () => {
            console.log(`Сервер запущен на http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Не удалось подключиться к базе данных:', error);
    }
};

startServer();

export default app;

