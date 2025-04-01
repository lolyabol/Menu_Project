import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/updateCalorieIntake', async (req, res) => {
    const { calories } = req.body;

    if (typeof calories !== 'number') {
        return res.status(400).send({ message: 'Неверные данные' });
    }

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({ message: 'Пользователь не найден' });
        }

        user.dailyCalorieIntake = calories;
        await user.save(); 

        res.status(200).send({ message: 'Данные успешно обновлены' });
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: 'Ошибка при обновлении данных' });
    }
});

export default router;

