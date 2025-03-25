import Ingredient from '../models/Ingredient.js';
import Dish from '../models/Dish.js';

export const MenuConstructorPage = async (req, res) => {
    try {
        const ingredients = await Ingredient.findAll();
        
        const plainIngredients = ingredients.map(ingredient => ingredient.get({ plain: true }));

        const dishes = await Dish.findAll(); 

        const plainDishes = dishes.map(dish => dish.get({ plain: true }));

        const selectedIngredientIds = req.body.selectedIngredients || []; 
        const matchingDishes = plainDishes.filter(dish => 
            dish.ingredients.some(ingredient => selectedIngredientIds.includes(ingredient.id))
        );

        res.render('menuConstructor', { 
            ingredients: plainIngredients,
            dishes: matchingDishes 
        });
    } catch (error) {
        console.error('Ошибка при получении ингредиентов или блюд:', error);
        res.status(500).send('Ошибка при загрузке страницы');
    }
};
