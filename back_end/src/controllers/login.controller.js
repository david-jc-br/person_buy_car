const Login = require('../models/login.model');

// Função para listar todos os logins
const getAllLogins = async (req, res) => {
    try {
        const logins = await Login.findAll();
        res.status(200).json(logins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar os logins' });
    }
};

// Função para obter um login pelo ID
const getLoginById = async (req, res) => {
    const { id } = req.params;
    try {
        const login = await Login.findByPk(id);
        if (!login) {
            return res.status(404).json({ message: 'Login não encontrado' });
        }
        res.status(200).json(login);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar o login' });
    }
};

// Função para criar um novo login
const createLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const login = await Login.create({ username, password });
        res.status(201).json(login);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar um novo login' });
    }
};

// Função para atualizar um login existente
const updateLogin = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        const login = await Login.findByPk(id);
        if (!login) {
            return res.status(404).json({ message: 'Login não encontrado' });
        }
        login.username = username;
        login.password = password;
        await login.save();
        res.status(200).json(login);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o login' });
    }
};

// Função para excluir um login
const deleteLogin = async (req, res) => {
    const { id } = req.params;
    try {
        const login = await Login.findByPk(id);
        if (!login) {
            return res.status(404).json({ message: 'Login não encontrado' });
        }
        await login.destroy();
        res.status(200).json({ message: 'Login excluído com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir o login' });
    }
};

module.exports = { getAllLogins, getLoginById, createLogin, updateLogin, deleteLogin };
