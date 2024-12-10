const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');
const AuthMiddleware = require('../middleware/authMiddleware');

router.post('/', AuthMiddleware(['customer']), BookingController.createBooking);
router.get('/', AuthMiddleware(['customer']), BookingController.getUserBookings);
router.delete('/:id', AuthMiddleware(['customer']), BookingController.cancelBooking);

module.exports = router;