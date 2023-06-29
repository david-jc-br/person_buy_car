const Buy = require('../models/buy.model');

// Função para listar todas as compras
const getAllBuys = async (req, res) => {
    try {
        const buys = await Buy.findAll();
        res.status(200).json(buys);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar as compras' });
    }
};

// Função para obter uma compra pelo ID
const getBuyById = async (req, res) => {
    const { id } = req.params;
    try {
        const buy = await Buy.findByPk(id);
        if (!buy) {
            return res.status(404).json({ message: 'Compra não encontrada' });
        }
        res.status(200).json(buy);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar a compra' });
    }
};

// Função para criar uma nova compra
const createBuy = async (req, res) => {
    const { car_id, buyer_id, purchase_date } = req.body;
    try {
        const buy = await Buy.create({ car_id, buyer_id, purchase_date });
        res.status(201).json(buy);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar uma nova compra' });
    }
};

// Função para atualizar uma compra existente
const updateBuy = async (req, res) => {
    const { id } = req.params;
    const { car_id, buyer_id, purchase_date } = req.body;
    try {
        const buy = await Buy.findByPk(id);
        if (!buy) {
            return res.status(404).json({ message: 'Compra não encontrada' });
        }
        buy.car_id = car_id;
        buy.buyer_id = buyer_id;
        buy.purchase_date = purchase_date;
        await buy.save();
        res.status(200).json(buy);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar a compra' });
    }
};

// Função para excluir uma compra
const deleteBuy = async (req, res) => {
    const { id } = req.params;
    try {
        const buy = await Buy.findByPk(id);
        if (!buy) {
            return res.status(404).json({ message: 'Compra não encontrada' });
        }
        await buy.destroy();
        res.status(200).json({ message: 'Compra excluída com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir a compra' });
    }
};

module.exports = { getAllBuys, getBuyById, createBuy, updateBuy, deleteBuy };
