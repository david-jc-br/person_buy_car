const express = require('express');
const router = express.Router();
const buyController = require('../controllers/buy.controller');

router.get('/', buyController.getAllBuys);

router.post('/', buyController.createBuy);

router.put('/:id', buyController.updateBuy);

router.delete('/:id', buyController.deleteBuy);

module.exports = router;