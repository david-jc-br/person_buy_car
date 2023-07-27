const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller');

router.get('/', carController.getAllCars);
router.get('/availables', carController.getAllAvailablesCars);
router.post('/', carController.createCar);
router.put('/:plate', carController.updateCar);
router.delete('/:plate', carController.deleteCar);

module.exports = router;
