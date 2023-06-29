const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');

router.get('/', loginController.getAllLogins);

router.post('/', loginController.createLogin);

router.put('/:id', loginController.updateLogin);

router.delete('/:id', loginController.deleteLogin);

module.exports = router;
