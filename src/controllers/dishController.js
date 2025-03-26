import Dish from '../models/Dish.js';

export const addDish = async (req, res) => {
    try {
        console.log('Полученные данные:', req.body); 
        const { name, calories, description, ingredients } = req.body;

        if (!name || !calories || !description || !ingredients) {
            return res.status(400).json({ message: 'Имя, калории, описание и ингредиенты обязательны' });
        }

        if (!Number.isInteger(calories)) {
            return res.status(400).json({ message: 'Калории должны быть целым числом' });
        }
        
        console.log('Проверенные данные:', { name, calories, description, ingredients });

        const newDish = await Dish.create({ name, calories, description, ingredients });
        
        res.status(201).json(newDish);
    } catch (error) {
        console.error('Ошибка при добавлении блюда:', error.errors ? error.errors : error);
        res.status(500).json({ message: 'Ошибка при добавлении блюда', error: error.message });
    }
};

export const getDishesByIngredients = async (req, res) => {
    try {
        const { ingredientIds } = req.body;

        const dishes = await Dish.find({ 'ingredients.id': { $in: ingredientIds } });

        res.json(dishes);
    } catch (error) {
        console.error('Ошибка при получении блюд:', error);
        res.status(500).json({ message: 'Ошибка при получении блюд' });
    }
};
