import express from 'express';
import { engine } from 'express-handlebars'; // Импортируем 'engine' из 'express-handlebars'

const app = express();

// Настройка шаблонизатора Handlebars
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.static('public'));
   


app.get('/', (req, res) => {
    res.redirect('/home'); // Перенаправляем на страницу /home
});

// Определите маршруты
app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/calorieCalculator', (req, res) => {
    res.render('calorieCalculator');
});

app.get('/menuConstructor', (req, res) => {
    res.render('menuConstructor');
});

app.get('/userMenu', (req, res) => {
    res.render('userMenu');
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});
