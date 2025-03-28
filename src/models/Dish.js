import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient', 
        required: true,
    }]
});

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;
