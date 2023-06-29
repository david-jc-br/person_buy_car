const People = require('../models/people.model');

// Função para listar todas as pessoas
const getAllPeople = async (req, res) => {
  try {
    const people = await People.findAll();
    res.status(200).json(people);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar as pessoas' });
  }
};

// Função para obter uma pessoa pelo ID
const getPersonById = async (req, res) => {
  const { id } = req.params;
  try {
    const person = await People.findByPk(id);
    if (!person) {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
    }
    res.status(200).json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar a pessoa' });
  }
};

// Função para criar uma nova pessoa
const createPerson = async (req, res) => {
  const { name, cpf, address } = req.body;
  try {
    const person = await People.create({ name, cpf, address });
    res.status(201).json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar uma nova pessoa' });
  }
};

// Função para atualizar uma pessoa existente
const updatePerson = async (req, res) => {
  const { id } = req.params;
  const { name, cpf, address } = req.body;
  try {
    const person = await People.findByPk(id);
    if (!person) {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
    }
    person.name = name;
    person.cpf = cpf;
    person.address = address;
    await person.save();
    res.status(200).json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar a pessoa' });
  }
};

// Função para excluir uma pessoa
const deletePerson = async (req, res) => {
  const { id } = req.params;
  try {
    const person = await People.findByPk(id);
    if (!person) {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
    }
    await person.destroy();
    res.status(200).json({ message: 'Pessoa excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir a pessoa' });
  }
};

module.exports = { getAllPeople, getPersonById, createPerson, updatePerson, deletePerson };
