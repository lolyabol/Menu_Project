import express from 'express';
import Dish from '../models/Dish.js';

const router = express.Router();

router.get('/calorie-calculator', (req, res) => {
    res.render('calorie-calculator', { title: 'Калькулятор калорий' });
});

router.post('/menu', async (req, res) => {
    const { calories } = req.body;
    const dishes = await Dish.findAll();
    res.render('menu', { dishes, totalCalories: calories });
});

export default router;

