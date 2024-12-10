const Booking = require('../models/bookingModel');
const Cart = require('../models/cartModel');
const Car = require('../models/carModel');
const User = require('../models/userModel');


const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abdulsamea2003@gmail.com',
        pass: 'zosc xpja opef ngqp',
    },
});

const sendConfirmationEmail = async (userEmail, bookingDetails) => {
    const mailOptions = {
        from: 'abdulsamea2003@gmail.com',
        to: userEmail,
        subject: 'Booking Confirmation',
        text: `Dear customer,\n\nYour booking has been confirmed.\n\nBooking Details:\n${bookingDetails}\n\nThank you for choosing our service!`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${userEmail}`);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send confirmation email. Please try again.');
    }
};

exports.createBooking = async (userId, paymentMethod, cardInfo, pickupAddress) => {
    const cart = await Cart.findOne({ user: userId }).populate('items.car');
    if (!cart || cart.items.length === 0) throw new Error('Cart is empty');

    const bookings = [];
    let bookingDetails = 'Cars booked:\n';

    for (const item of cart.items) {
        const booking = await Booking.create({
            user: userId,
            car: item.car._id,
            startDate: item.startDate,
            endDate: item.endDate,
            totalDays: item.days,
            totalPrice: item.days * item.car.pricePerDay,
            pickupAddress,
            paymentMethod,
            cardInfo: paymentMethod === 'card' ? cardInfo : null,
        });

        item.car.available = false;
        await item.car.save();

        bookings.push(booking);
        bookingDetails += `- Car: ${item.car.name}, Start Date: ${item.startDate}, End Date: ${item.endDate}, Total Price: ${booking.totalPrice}\n`;
    }

    await Cart.deleteOne({ user: userId });

    const user = await User.findById(userId);
    if (!user || !user.email) {
        throw new Error('User email not found. Booking created but email not sent.');
    }

    await sendConfirmationEmail(user.email, bookingDetails);

    return bookings;
};


exports.getUserBookings = async function (userId) {
    const bookings = await Booking.find({ user: userId })
        .populate('car') // Populate car details if needed
        .sort({ createdAt: -1 }); // Sort by creation date (latest first)

    if (!bookings || bookings.length === 0) {
        throw new Error('No bookings found');
    }

    return bookings;
};


exports.cancelBooking = async (bookingId, userId) => {
    const booking = await Booking.findOne({ _id: bookingId, user: userId });
    if (!booking) throw new Error('Booking not found');

    const twoDaysBefore = new Date(booking.startDate);
    twoDaysBefore.setDate(twoDaysBefore.getDate() - 2);

    if (new Date() > twoDaysBefore) throw new Error('Too late to cancel now');

    booking.status = 'canceled';
    await booking.save();

    const car = await Car.findById(booking.car);
    car.available = true;
    await car.save();

    return booking;
};
