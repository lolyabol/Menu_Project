// models/Menu.js
import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;