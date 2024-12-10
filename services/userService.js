const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config'); // Import the secret
const bcrypt = require('bcrypt');

exports.registerUser = async (userData) => {
    return await User.create(userData);
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET, // Use the centralized secret
        { expiresIn: '1d' }
    );

    return { user, token };
};

exports.getUserProfile = async (userId) => {
    return await User.findById(userId);
};
