import { DataTypes } from 'sequelize';
import sequelizeDB from '../db.js';

const Dish = sequelizeDB.define('Dish', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ingredients: {
        type: DataTypes.JSONB,
        allowNull: false,
    }
});

export default Dish;
