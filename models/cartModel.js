const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    days: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
});

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [CartItemSchema],
    totalAmount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
