const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller');

router.get('/', carController.getAllCars);

router.post('/', carController.createCar);

router.put('/:id', carController.updateCar);

router.delete('/:id', carController.deleteCar);

module.exports = router;