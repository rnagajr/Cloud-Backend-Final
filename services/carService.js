const Car = require('../models/carModel');

exports.getAllCars = async () => {
    return await Car.find();
};

exports.getCarDetails = async (id) => {
    return await Car.findById(id);
};

exports.createCar = async (carData) => {
    return await Car.create(carData);
};

exports.updateCar = async (id, updateData) => {
    return await Car.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteCar = async (id) => {
    return await Car.findByIdAndDelete(id);
};

exports.bookCar = async (id) => {
    const car = await Car.findById(id);
    if (!car || !car.available) {
        throw new Error('Car not available');
    }
    car.available = false;
    await car.save();
    return car;
};
