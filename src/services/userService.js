import { User } from '../models/User'; 
import bcrypt from 'bcrypt';

export const registerUser = async (username, password) => {
    if (!username || !password) {
        throw new Error('Username and password are required.');
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
        throw new Error('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            username,
            password: hashedPassword
        });
        return 'User registered successfully.';
    } catch (error) {
        throw new Error('Error saving user: ' + error.message);
    }
};
