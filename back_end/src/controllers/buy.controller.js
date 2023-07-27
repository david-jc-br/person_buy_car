// Import the buyService with the CRUD operations
const buyService = require('../services/buy.services');

// Controller to handle creating a new Buy
async function createBuy(req, res) {
    const { dateBuy, buyer_cpf, car_plate } = req.body;
    try {
        const buy = await buyService.createBuy(dateBuy, buyer_cpf, car_plate);
        res.status(201).json(buy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controller to handle updating a Buy by ID
async function updateBuy(req, res) {
    const { id } = req.params;
    const { dateBuy, buyer_cpf, car_plate } = req.body;
    try {
        const buy = await buyService.updateBuy(id, dateBuy, buyer_cpf, car_plate);
        res.json(buy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controller to handle deleting a Buy by ID
async function deleteBuy(req, res) {
    const { id } = req.params;
    try {
        const result = await buyService.deleteBuy(id);
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controller to handle getting all Buys
async function getAllBuys(req, res) {
    try {
        const buys = await buyService.getAllBuys();
        res.json(buys);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controller to handle getting a Buy by ID
async function getBuyById(req, res) {
    const { id } = req.params;
    try {
        const buy = await buyService.getBuyById(id);
        res.json(buy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controller to handle getting Buys by Buyer's CPF
async function getBuysByCpf(req, res) {
    const { buyer_cpf } = req.params;
    try {
        const buys = await buyService.getBuysByCpf(buyer_cpf);
        res.json(buys);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createBuy,
    updateBuy,
    deleteBuy,
    getAllBuys,
    getBuyById,
    getBuysByCpf,
};
