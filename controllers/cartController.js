// CartController.js
const cartService = require('../services/cartService');

exports.addToCart = async (req, res) => {
    try {
        const { carId, startDate, endDate } = req.body;
        const userId = req.user.id;
        const cart = await cartService.addToCart(userId, carId, startDate, endDate);
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await cartService.getCart(userId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.removeItemFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { carId } = req.body;

        const updatedCart = await cartService.removeItemFromCart(userId, carId);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        await cartService.clearCart(userId);
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};