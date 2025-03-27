import mongoose from 'mongoose';
import Ingredient from '../models/Ingredient'; // Убедитесь, что путь к модели правильный

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to the database');

    // Получение всех ингредиентов
    Ingredient.find()
        .then(ingredients => {
            console.log('Ингредиенты в базе данных:', ingredients);
        })
        .catch(err => {
            console.error('Ошибка при получении ингредиентов:', err);
        })
        .finally(() => {
            mongoose.connection.close(); // Закрываем соединение после завершения
        });
})
.catch(err => {
    console.error('Ошибка подключения к базе данных:', err);
});
