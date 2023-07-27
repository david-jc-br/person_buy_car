const carService = require('../services/car.services');

const getAllCars = async (req, res) => {
    try {
        const cars = await carService.getAllCars();
        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getAllAvailablesCars = async (req, res) => {
    try {
        const cars = await carService.getAllAvailablesCars();
        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const createCar = async (req, res) => {
    const { plate, brand, model, year, price } = req.body;
    try {
        const car = await carService.createCar({ plate, brand, model, year, price });
        res.json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updateCar = async (req, res) => {
    const { plate } = req.params;
    const { newPlate, brand, model, year, price, status } = req.body;
    try {
        const car = await carService.updateCar(plate, { newPlate, brand, model, year, price, status });
        res.json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteCar = async (req, res) => {
    const { plate } = req.params;
    try {
        const car = await carService.deleteCar(plate);
        res.status(200).send(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCars,
    getAllAvailablesCars,
    createCar,
    updateCar,
    deleteCar
};
