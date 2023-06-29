const carService = require('../services/car.service');

const getAllCars = async (req, res) => {
    try {
        const cars = await carService.getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar os carros' });
    }
};

const createCar = async (req, res) => {
    const carData = req.body;
    try {
        const car = await carService.createCar(carData);
        res.status(201).json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar um novo carro' });
    }
};

const updateCar = async (req, res) => {
    const { id } = req.params;
    const carData = req.body;
    try {
        const car = await carService.updateCar(id, carData);
        res.status(200).json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o carro' });
    }
};

const deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await carService.deleteCar(id);
        res.status(200).json({ message: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir o carro' });
    }
};

module.exports = { getAllCars, createCar, updateCar, deleteCar };
