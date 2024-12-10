const carService = require('../services/carService');

exports.getAllCars = async (req, res) => {
    try {
        const cars = await carService.getAllCars();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCarDetails = async (req, res) => {
    try {
        const car = await carService.getCarDetails(req.params.id);
        if (!car) return res.status(404).json({ error: 'Car not found' });
        res.json(car);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCar = async (req, res) => {
    try {
        const carData = req.body;
        if (req.file) {
            carData.picture = `/uploads/cars/${req.file.filename}`;
        }
        const newCar = await carService.createCar(carData);
        res.status(201).json(newCar);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        const updateData = req.body;
        if (req.file) {
            updateData.picture = `/uploads/cars/${req.file.filename}`;
        }
        const updatedCar = await carService.updateCar(req.params.id, updateData);
        if (!updatedCar) return res.status(404).json({ error: 'Car not found' });
        res.json(updatedCar);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.deleteCar = async (req, res) => {
    try {
        const deletedCar = await carService.deleteCar(req.params.id);
        if (!deletedCar) return res.status(404).json({ error: 'Car not found' });
        res.json({ message: 'Car deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};