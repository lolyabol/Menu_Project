// models/Dish.js
import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient', 
    }],
    calories: {
        type: Number,
        required: true,
    },
    imageURL: {
        type: String,
        required: false,
    },
    description: { 
        type: String,
        required: false,
    },
    recipe: { 
        type: String,
        required: true,
    },
    ingredientsList: [{ 
        ingredientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient',
            required: true,
        },
        quantity: {
            type: Number,
            required: true, 
        }
    }]
});

const Dish = mongoose.model('Dish', dishSchema);
export default Dish;