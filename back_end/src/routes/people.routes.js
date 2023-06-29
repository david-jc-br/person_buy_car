const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/people.controller');

router.get('/', peopleController.getAllPeople);

router.post('/', peopleController.createPerson);

router.put('/:id', peopleController.updatePerson);

router.delete('/:id', peopleController.deletePerson);

module.exports = router;
