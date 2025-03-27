import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        await connect('mongodb+srv://vturilasy:1f3t48y2@menuprojectdb.r1ilxoz.mongodb.net/?retryWrites=true&w=majority&appName=MenuProjectDB', {

        });
        console.log('MongoDB подключен');
    } catch (error) {
        console.error('Ошибка подключения к MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;