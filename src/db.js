import { Sequelize } from 'sequelize';

const sequelizeDB = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db', 
});

async function testConnection() {
    try {
        await sequelizeDB.authenticate();
        console.log('Соединение с базой данных успешно установлено.');
    } catch (error) {
        console.error('Не удалось подключиться к базе данных:', error);
    }
}

testConnection();

export default sequelizeDB;

