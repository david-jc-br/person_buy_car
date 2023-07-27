const peopleService = require('../services/people.services')

const getAllPeople = async (req, res, next) => {
	try {
		const people = await peopleService.getAllPeople();
		res.json(people);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

const getPersonByCpf = async (req, res, next) => {
	const { cpf } = req.params;
	try {
		const people = await peopleService.getPersonByCpf(cpf);
		res.json(people);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};


const createPerson = async (req, res, next) => {
	const { cpf, name, email, profile, password } = req.body;
	try {
		const person = await peopleService.createPerson({ cpf, name, email, profile
			,password });
		res.json(person);
	} catch (error) {
		console.error(error);
		console.error(error);
		res.status(500).json({ error: error.message })
	}
};

const login = async (req, res, next) => {
	const { cpf, password } = req.body;
	try {
		const user = await peopleService.login(cpf, password);
		res.json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: error.message });
	}
};

const updatePerson = async (req, res, next) => {
	const { cpf } = req.params;
	const { name, email, password } = req.body;
	try {
		const person = await peopleService.updatePerson(cpf, { name, email, password });
		res.json(person);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

const deletePerson = async (req, res, next) => {
	const { cpf } = req.params;
	try {
		const result = await peopleService.deletePerson(cpf);
		res.json(result);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getAllPeople,
	createPerson,
	getPersonByCpf,
	login,
	updatePerson,
	deletePerson,
};
