// controllers/loginController.js
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const LoginPage = (req, res) => {
    console.log("showLoginPage вызван");
    res.render('login');
};

export const handleLogin = async (req, res) => {
    console.log("handleLogin вызван");
    const { email, password } = req.body; 

    if (!email || !password) {
        return res.status(400).json({ message: 'Email и пароль обязательны' });
    }

    console.log('Email:', email);
    console.log('Password:', password);
    
    try {
        // Исправлено: используем просто объект для поиска
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' });
        }

        console.log('Найденный пользователь:', user);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль' });
        }

        // Сохранение информации о пользователе в сессии
        req.session.userId = user._id; // Используем _id вместо id
        req.session.email = user.email;

        res.redirect('/main'); 
    } catch (error) {
        console.error('Ошибка во время входа:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};
