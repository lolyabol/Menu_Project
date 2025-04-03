import { getDishesByIngredients } from '../services/dishService.js';
import Dish from '../models/Dish.js'; 
import Ingredient from '../models/Ingredient.js';

export const renderMenuPage = async (req, res) => {
    try {
        const ingredients = await Ingredient.find(); 
        res.render('menu', { ingredients });
    } catch (error) {
        console.error('Ошибка при рендеринге страницы меню:', error);
        res.status(500).send('Ошибка при загрузке страницы меню');
    }
};

export const filterDishes = async (req, res) => {
    const mealType = req.body.mealType; 
    const { ingredients } = req.body;

    try {
        const dishes = await getDishesByIngredients(ingredients, mealType);
        res.json(dishes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addDish = async (req, res) => {
    try {
        const { name, ingredients, calories, imageURL, description, recipe, ingredientsList, mealType } = req.body;

        if (!ingredients || ingredients.length === 0) {
            return res.status(400).json({ message: 'Ингредиенты обязательны' });
        }

        if (!recipe || !ingredientsList || ingredientsList.length === 0) {
            return res.status(400).json({ message: 'Рецепт обязателен и должен содержать инструкции и список ингредиентов' });
        }

        if (!mealType) {
            return res.status(400).json({ message: 'Тип блюда обязателен' });
        }

        const newDish = new Dish({
            name,
            ingredients,
            calories,
            imageURL,
            description,
            recipe,
            ingredientsList,
            mealType 
        });

        await newDish.save();

        res.status(201).json({ message: 'Блюдо добавлено', dish: newDish });
    } catch (error) {
        console.error('Ошибка при добавлении блюда:', error);
        res.status(500).json({ message: 'Ошибка при добавлении блюда', error: error.message });
    }
};