const { Buy, Car, People } = require('../models/main.model');

async function createBuy(dateBuy, buyer_cpf, car_plate) {
    try {
        // Verificar se o carro com a placa especificada existe e seu status é "available"
        const car = await Car.findOne({ where: { plate: car_plate, status: 'available' } });
        if (!car) {
            throw new Error('Car not found or not available');
        }

        // Verificar se o comprador com o CPF especificado existe
        const buyer = await People.findOne({ where: { cpf: buyer_cpf } });
        if (!buyer || buyer.profile === "admin") {
            throw new Error('Buyer not found or not permisson');
        }

        // Criar a compra apenas se todas as verificações forem bem-sucedidas
        const buy = await Buy.create({ dateBuy, buyer_cpf, car_plate });

        await Car.update({ status: 'sold' }, { where: { plate: car_plate } });

        return buy;
    } catch (error) {
        console.error(error.message);
        throw new Error('Error creating the Buy: ' + error);
    }
}

// Function to update a Buy by ID
async function updateBuy(id, dateBuy, buyer_cpf, car_plate) {
    try {
        const buy = await Buy.findByPk(id);
        if (!buy) {
            throw new Error('Buy not found.');
        }

        await buy.update({ dateBuy, buyer_cpf, car_plate });
        return buy;
    } catch (error) {
        throw new Error('Error updating the Buy: ' + error);
    }
}

// Function to delete a Buy by ID
async function deleteBuy(id) {
    try {
        const buy = await Buy.findByPk(id);
        if (!buy) {
            throw new Error('Buy not found.');
        }

        await buy.destroy();
        return 'Buy deleted successfully.';
    } catch (error) {
        throw new Error('Error deleting the Buy: ' + error);
    }
}

// Function to get all Buys
async function getAllBuys() {
    try {
        const buys = await Buy.findAll();
        return buys;
    } catch (error) {
        throw new Error('Error fetching all Buys.');
    }
}

// Function to get a Buy by ID
async function getBuyById(id) {
    try {
        const buy = await Buy.findByPk(id);
        if (!buy) {
            throw new Error('Buy not found.');
        }
        return buy;
    } catch (error) {
        throw new Error('Error fetching the Buy by ID: ' + error);
    }
}

// Function to get Buys by Buyer's CPF
async function getBuysByCpf(buyer_cpf) {
    try {
        const buys = await Buy.findAll({ where: { buyer_cpf } });
        return buys;
    } catch (error) {
        throw new Error('Error fetching Buys by Buyer\'s CPF: ' + error);
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
