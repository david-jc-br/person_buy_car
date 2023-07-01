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

const getMyCars = async (req, res) => {
    const { owner_cpf } = req.params;
    try {
        const myCars = await carService.getMyCars(owner_cpf);
        res.json(myCars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const createCar = async (req, res) => {
    const { brand, model, year, owner_cpf } = req.body;
    try {
        const car = await carService.createCar({ brand, model, year, owner_cpf });
        res.json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updateCarOwner = async (req, res) => {
    const { id } = req.params;
    const { owner_cpf } = req.body;
    try {
        const car = await carService.updateCarOwner(id, owner_cpf);
        res.json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updateCar = async (req, res) => {
    const { id } = req.params;
    const { brand, model, year, plate } = req.body;
    try {
        const car = await carService.updateCar(id, { brand, model, year, plate });
        res.json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await carService.deleteCar(id);
        res.status(200).send(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCars,
    getMyCars,
    createCar,
    updateCarOwner,
    updateCar,
    deleteCar
};
