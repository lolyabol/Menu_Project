import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    imageURL: { 
        type: String,
        required: false,  
    },
    type: {
        type: String,
        required: true, 
    },
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;