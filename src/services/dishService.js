import Dish from '../models/Dish.js';

export const getDishesByIngredients = async (ingredients, mealType) => {
    try {
        console.log(`Поиск блюд по ингредиентам: ${ingredients}, тип блюда: ${mealType}`);
        
        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            throw new Error('Необходимо передать массив идентификаторов ингредиентов.');
        }

        const query = {
            'ingredientsList.ingredientId': { $in: ingredients }
        };

        if (mealType) {
            query.mealType = mealType;
        }

        const dishes = await Dish.find(query).populate('ingredientsList.ingredientId');

        return dishes;
    } catch (error) {
        console.error('Ошибка при получении блюд:', error.message);
        throw new Error('Ошибка при получении блюд: ' + error.message);
    }
};