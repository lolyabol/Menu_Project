import Ingredient from '../models/Ingredient.js';

export const getAllIngredients = async () => {
    return await Ingredient.find();
};