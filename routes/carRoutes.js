const express = require('express');
const router = express.Router();
const CarController = require('../controllers/carController');
const AuthMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/cars/')); // Use absolute path
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});


const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'));
        }
    }
});

// Public routes
router.get('/', CarController.getAllCars);
router.get('/:id', CarController.getCarDetails);

// Admin-specific routes
router.post('/', AuthMiddleware(['admin']), upload.single('picture'), CarController.createCar);
router.put('/:id', AuthMiddleware(['admin']), upload.single('picture'), CarController.updateCar);
router.delete('/:id', AuthMiddleware(['admin']), CarController.deleteCar);

module.exports = router;
