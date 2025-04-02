import User from '../models/User.js';
import Dish from '../models/Dish.js';

export const addDishToMenu = async (req, res) => {
    const userId = req.user._id; 
    const { dishId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const dish = await Dish.findById(dishId);
        if (!dish) {
            return res.status(404).json({ message: 'Блюдо не найдено' });
        }

        if (!user.menu.includes(dish._id)) { 
            user.menu.push(dish._id);
            await user.save();
            return res.status(200).json({ message: 'Блюдо добавлено в меню', menu: user.menu });
        } else {
            return res.status(400).json({ message: 'Блюдо уже добавлено в меню' });
        }
    } catch (error) {
        console.error('Ошибка при добавлении блюда в меню:', error);
        return res.status(500).json({ message: 'Ошибка при добавлении блюда в меню', error });
    }
};

export const getUserMenu = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('menu'); 
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const totalCalories = user.menu.reduce((sum, dish) => sum + dish.calories, 0);
        
        const remainingCalories = user.dailyCalorieIntake - totalCalories;

        res.status(200).json({
            menu: user.menu,
            remainingCalories: remainingCalories,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};


export const removeDishFromMenu = async (req, res) => {
    const dishId = req.params.id;

    try {
        const user = await User.findById(req.user.id); 

        if (!user) {
            return res.status(404).send('Пользователь не найден');
        }

        user.menu = user.menu.filter(dish => dish.toString() !== dishId);

        await user.save();

        res.status(200).send('Блюдо успешно удалено из меню');
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при удалении блюда из меню');
    }
};
