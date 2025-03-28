import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const registerUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    await newUser.save();

    return 'Регистрация прошла успешно! Пожалуйста, войдите в систему.';
};
