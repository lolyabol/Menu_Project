import { DataTypes } from 'sequelize';
import sequelizeDB from '../db.js'; 

const Ingredient = sequelizeDB.define('Ingredient', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imageURL: { 
        type: DataTypes.STRING,
        allowNull: true,  
    },
});

export default Ingredient;
