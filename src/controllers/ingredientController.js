import { getAllIngredients } from '../services/ingredientService.js';
import Ingredient from '../models/Ingredient.js'; 

export const fetchAllIngredients = async (req, res) => {
    try {
        const ingredients = await getAllIngredients();
        res.json(ingredients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addIngredients = async (req, res) => {
    const ingredients = req.body;

    if (!Array.isArray(ingredients)) {
        return res.status(400).json({ message: 'Ingredients must be an array.' });
    }

    for (const ingredient of ingredients) {
        const { name, calories, type } = ingredient;

        console.log('Проверка ингредиента:', ingredient);

        if (name === undefined || calories === undefined || type === undefined) {
            console.log('Недостаточные данные для ингредиента:', ingredient);
            return res.status(400).json({ message: 'Name, calories, and type are required for each ingredient.' });
        }

        if (typeof name !== 'string' || typeof type !== 'string' || typeof calories !== 'number') {
            console.log('Неверные типы данных для ингредиента:', ingredient);
            return res.status(400).json({ message: 'Invalid data types for ingredient fields.' });
        }
    }

    try {
        const newIngredients = await Ingredient.insertMany(ingredients);
        res.status(201).json(newIngredients);
    } catch (error) {
        console.error('Ошибка при добавлении ингредиентов:', error);
        res.status(500).json({ message: error.message });
    }
};