const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    description: { type: String, required: true },
    pricePerDay: { type: Number, required: true }, // Added price per day
    available: { type: Boolean, default: true },
    picture: { type: String }, // URL or path to the car's picture
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);
