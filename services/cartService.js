const Cart = require('../models/cartModel');
const Car = require('../models/carModel');

exports.addToCart = async (userId, carId, startDate, endDate) => {
    const car = await Car.findById(carId);
    if (!car || !car.available) throw new Error('Car not available');

    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = days * car.pricePerDay;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = await Cart.create({ user: userId });

    cart.items.push({ car: carId, startDate, endDate, days, pricePerDay: car.pricePerDay });
    cart.totalAmount += totalPrice;

    await cart.save();
    return cart;
};

exports.getCart = async (userId) => {
    return await Cart.findOne({ user: userId }).populate('items.car');
};

exports.removeItemFromCart = async (userId, carId) => {
    // Find the cart for the user
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error('Cart not found');

    // Find the index of the item to be removed
    const itemIndex = cart.items.findIndex(item => item.car.toString() === carId);
    if (itemIndex === -1) throw new Error('Item not found in cart');

    // Calculate the updated total amount and remove the item
    const item = cart.items[itemIndex];
    cart.totalAmount -= item.days * item.pricePerDay;
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();
    return cart;
};

exports.clearCart = async (userId) => {
    await Cart.deleteOne({ user: userId });
};
