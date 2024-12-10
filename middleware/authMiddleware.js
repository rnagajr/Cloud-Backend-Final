const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config'); // Import the secret

module.exports = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        try {
            const decoded = jwt.verify(token, JWT_SECRET); // Use the centralized secret
            req.user = decoded;

            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();
        } catch (err) {
            res.status(401).json({ message: 'Unauthorized' });
        }
    };
};
