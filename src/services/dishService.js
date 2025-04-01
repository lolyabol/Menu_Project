import Dish from '../models/Dish.js';

export const getDishesByIngredients = async (ingredients) => {
    try {
        console.log(`Поиск блюд по ингредиентам: ${ingredients}`);
        
        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            throw new Error('Необходимо передать массив идентификаторов ингредиентов.');
        }

        const dishes = await Dish.find({
            'ingredientsList.ingredientId': { $in: ingredients } 
        }).populate('ingredientsList.ingredientId');

        return dishes;
    } catch (error) {
        console.error('Ошибка при получении блюд:', error.message);
        throw new Error('Ошибка при получении блюд: ' + error.message);
    }
};