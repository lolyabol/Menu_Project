// services/registrationService.js
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const registerUser = async (username, email, password) => {
    // Хешируем пароль перед сохранением
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    // Сохраняем пользователя в базе данных
    await newUser.save();

    return 'Регистрация прошла успешно! Пожалуйста, войдите в систему.';
};
