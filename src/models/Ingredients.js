import { DataTypes } from 'sequelize';
import sequelizeDB from '../db.js';

const Ingredient = sequelizeDB.define('Ingredient', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    tableName: 'ingredients',
    timestamps: false 
});

export default Ingredient;

