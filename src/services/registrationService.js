import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const registerUser = async (username, email, password) => {
    if (!username || !email || !password) {
        throw new Error('Все поля (имя пользователя, email и пароль) должны быть заполнены.');
    }

    const existingUserUsername = await User.findOne({ where: { username } });
    const existingUserEmail = await User.findOne({ where: { email } });

    if (existingUserUsername) {
        throw new Error('Пользователь с таким именем уже существует.');
    }

    if (existingUserEmail) {
        throw new Error('Пользователь с таким email уже существует.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    return `Пользователь ${newUser.username} успешно зарегистрирован!`;
};
