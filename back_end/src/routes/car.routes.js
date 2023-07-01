const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller');

router.get('/', carController.getAllCars);
router.post('/', carController.createCar);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);

router.put('/:id/ownerCpf', carController.updateCarOwner);
router.get('/myCars/:cpf', carController.getMyCars);

module.exports = router;
