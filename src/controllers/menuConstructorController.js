import Ingredient from '../models/Ingredient.js';
import Dish from '../models/Dish.js'; 

export const MenuConstructorPage = async (req, res) => {
    const user = req.user; 
    try {
        const ingredients = await Ingredient.find(); 
        
        const plainIngredients = ingredients.map(ingredient => ingredient.toObject());

        const dishes = await Dish.find(); 

        const plainDishes = dishes.map(dish => dish.toObject());

        const selectedIngredientIds = req.body.selectedIngredients || []; 
        const matchingDishes = plainDishes.filter(dish => 
            dish.ingredients.some(ingredient => selectedIngredientIds.includes(ingredient.id))
        );

        res.render('menuConstructor', { 
            ingredients: plainIngredients,
            dishes: matchingDishes,
            user 
        });
        
    } catch (error) {
        console.error('Ошибка при получении ингредиентов или блюд:', error);
        res.status(500).send('Ошибка при загрузке страницы');
    }
};

