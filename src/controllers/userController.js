import User from '../models/User.js';
import Dish from '../models/Dish.js';
import Menu from '../models/Menu.js';

export const addDishToMenu = async (req, res) => {
    const userId = req.user._id; 
    const { dishId } = req.body;

    try {
        console.log('userId:', userId);
        console.log('dishId:', dishId);

        const dish = await Dish.findById(dishId);
        if (!dish) {
            return res.status(404).json({ message: 'Блюдо не найдено' });
        }

        let menu = await Menu.findOne({ userId });
        
        if (!menu) {
            menu = new Menu({
                userId,
                dishes: [dish._id],
            });
            await menu.save();
            return res.status(201).json({ message: 'Меню создано и блюдо добавлено', menu });
        } else {
            if (!menu.dishes.includes(dish._id)) {
                menu.dishes.push(dish._id);
                await menu.save();
                return res.status(200).json({ message: 'Блюдо добавлено в меню', menu });
            } else {
                return res.status(400).json({ message: 'Блюдо уже добавлено в меню' });
            }
        }
    } catch (error) {
        console.error('Ошибка при добавлении блюда в меню:', error.message);
        return res.status(500).json({ message: 'Ошибка при добавлении блюда в меню', error: error.message });
    }
};

export const getUserMenu = async (req, res) => {
    console.log('Запрос на получение меню');
    const userId = req.user._id; 

    try {
        const menu = await Menu.findOne({ userId }).populate('dishes');
        const user = await User.findById(userId);

        if (!menu) {
            return res.status(404).json({ message: 'Меню не найдено' });
        }

        const totalCaloriesInMenu = menu.dishes.reduce((total, dish) => total + (dish.calories || 0), 0);
        const remainingCalories = user.dailyCalorieIntake - totalCaloriesInMenu;

        res.json({ 
            menu: { ...menu._doc, dishes: menu.dishes },
            remainingCalories 
        });
    } catch (error) {
        console.error('Ошибка при получении меню:', error);
        res.status(500).json({ message: 'Ошибка при получении меню' });
    }
};

export const removeDishFromMenu = async (req, res) => {
    const dishId = req.params.id;

    try {
        const user = await User.findById(req.user.id); 

        if (!user) {
            return res.status(404).send('Пользователь не найден');
        }
        const menu = await Menu.findOne({ userId: user._id });

        if (!menu) {
            return res.status(404).send('Меню не найдено');
        }

        menu.dishes = menu.dishes.filter(dish => dish.toString() !== dishId);
        
        await menu.save();

        res.status(200).send('Блюдо успешно удалено из меню');
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при удалении блюда из меню');
    }
};

export const getDishById = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id)
            .populate('ingredients')
            .exec();

        if (!dish) {
            return res.status(404).json({ message: 'Блюдо не найдено' });
        }

        const ingredientsList = dish.ingredients.map(ingredient => ({
            ingredientId: ingredient._id,
            ingredientName: ingredient.name, 
            quantity: ingredient.quantity
        }));

        res.json({ ...dish.toObject(), ingredientsList });
    } catch (error) {
        console.error('Ошибка при получении блюда:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};