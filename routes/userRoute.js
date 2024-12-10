const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const AuthMiddleware = require('../middleware/authMiddleware');

// Registration and login
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Middleware-protected routes
router.get('/profile', AuthMiddleware(['customer', 'admin']), UserController.getProfile);

module.exports = router;
