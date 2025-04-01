import User from '../models/User.js';
import Dish from '../models/Dish.js';

// Добавление блюда в меню пользователя
export const addDishToUserMenu = async (req, res) => {
    const userId = req.user._id; // Получаем ID пользователя из аутентификации
    const { dishId } = req.body;

    try {
        // Проверяем существование пользователя
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Проверяем существование блюда
        const dish = await Dish.findById(dishId);
        if (!dish) {
            return res.status(404).json({ message: 'Блюдо не найдено' });
        }

        // Добавляем блюдо в меню пользователя
        if (!user.menu.includes(dish._id)) { // Проверяем, не добавлено ли уже блюдо
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
    const userId = req.user._id; 

    try {

        const user = await User.findById(userId).populate('menu');
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        return res.status(200).json(user.menu);
    } catch (error) {
        console.error('Ошибка при получении меню:', error);
        return res.status(500).json({ message: 'Ошибка при получении меню', error });
    }
};