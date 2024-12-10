const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const AuthMiddleware = require('../middleware/authMiddleware');

router.post('/add', AuthMiddleware(['customer']), CartController.addToCart);
router.get('/', AuthMiddleware(['customer']), CartController.getCart);
router.delete('/', AuthMiddleware(['customer']), CartController.clearCart);
router.delete('/item', AuthMiddleware(['customer']), CartController.removeItemFromCart);


module.exports = router;