const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/people.controller');

router.get('/', peopleController.getAllPeople);

router.post('/', peopleController.createPerson);

router.post('/login', peopleController.login);

router.put('/:cpf', peopleController.updatePerson);

router.delete('/:cpf', peopleController.deletePerson);

module.exports = router;
