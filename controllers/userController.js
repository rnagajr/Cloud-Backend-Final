const userService = require('../services/userService');

exports.register = async (req, res) => {
    try {
        const newUser = await userService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await userService.loginUser(email, password);
        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await userService.getUserProfile(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};
