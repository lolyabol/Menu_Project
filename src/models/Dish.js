import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Dish = sequelize.define('Dish', {
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
    }
});

export default Dish;

