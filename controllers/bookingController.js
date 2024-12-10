// BookingController.js
const bookingService = require('../services/bookingService');

exports.createBooking = async (req, res) => {
    try {
        const userId = req.user.id;
        const { paymentMethod, cardInfo, pickupAddress } = req.body;
        const bookings = await bookingService.createBooking(userId, paymentMethod, cardInfo, pickupAddress);
        res.status(201).json(bookings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await bookingService.getUserBookings(userId);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const userId = req.user.id;
        const booking = await bookingService.cancelBooking(bookingId, userId);
        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};