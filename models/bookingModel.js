const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDays: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    pickupAddress: { type: String, required: true },
    paymentMethod: { type: String, enum: ['cash', 'card'], required: true },
    cardInfo: {
        cardNumber: String,
        cardHolderName: String,
        expirationDate: String,
        cvv: String,
    },
    status: { type: String, enum: ['booked', 'canceled'], default: 'booked' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
