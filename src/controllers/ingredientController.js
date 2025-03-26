import Ingredient from '../models/Ingredient.js';

export const addIngredient = async (req, res) => {
    try {
        console.log('Полученные данные:', req.body); 
        const { name, quantity, imageURL, calories } = req.body;

        if (!name || !quantity || !imageURL || !calories) {
            return res.status(400).json({ message: 'Имя, изображение, количество и калории обязательны' });
        }

        const newIngredient = await Ingredient.create({ name, quantity, imageURL, calories });
        
        res.status(201).json(newIngredient);
    } catch (error) {
        console.error('Ошибка при добавлении ингредиента:', error.errors ? error.errors : error);
        res.status(500).json({ message: 'Ошибка при добавлении ингредиента', error: error.message });
    }
};
