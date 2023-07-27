const express = require('express');
const router = express.Router();
const buyController = require('../controllers/buy.controller');

// Route to create a new Buy
router.post('/', buyController.createBuy);

// Route to update a Buy by ID
router.put('/:id', buyController.updateBuy);

// Route to delete a Buy by ID
router.delete('/:id', buyController.deleteBuy);

// Route to get all Buys
router.get('/', buyController.getAllBuys);

// Route to get a Buy by ID
router.get('/:id', buyController.getBuyById);

// Route to get Buys by Buyer's CPF
router.get('/cpf/:buyer_cpf', buyController.getBuysByCpf);

module.exports = router;
