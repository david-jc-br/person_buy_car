const { Car } = require('../models/main.model');

const getAllCars = async () => {
    try {
        const cars = await Car.findAll();
        return cars;
    } catch (error) {
        console.error(error);
        throw new Error('Error when searching cars');
    }
};

const getAllAvailablesCars = async () => {
    try {
        const cars = await Car.findAll({ where: { status: "available" } });
        return cars;
    } catch (error) {
        
    }
}

const createCar = async (carData) => {
    const { plate, brand, model, year, price } = carData;
    try {
        isValidBrand(brand);
        isValidModel(model);
        isValidPlate(plate);
        isValidYear(year);
        isValidPrice(price)

        const car = await Car.create({ plate, brand, model, year, price, status:"available"});

        return car;
    } catch (error) {
        console.error(error);
        throw new Error('Error when creating a new car');
    }
};

const updateCar = async (plate, carData) => {
    const { newPlate, brand, model, year, price, status } = carData;
    try {
        isValidBrand(brand);
        isValidModel(model);
        isValidYear(year);
        isValidStatus(status);
        isValidPrice(price)

        const existingCar = await Car.findOne({ where: { plate } });
        if (!existingCar) {
            throw new Error('Car not found');
        }

        if (newPlate && newPlate !== plate) {
            const carWithNewPlate = await Car.findOne({ where: { plate: newPlate } });
            if (carWithNewPlate) {
                throw new Error('Another car with the new plate already exists');
            }
        }

        const updateFields = { brand, model, year, price, status };
        if (newPlate && newPlate !== plate) {
            updateFields.plate = newPlate;
        }

        await Car.update(updateFields, { where: { plate } });

        // Recarregue o objeto car após a atualização
        const updatedCar = await Car.findOne({ where: { plate } });

        console.log('Car updated:', updatedCar.dataValues);
        return updatedCar;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating car: ' + error);
    }
};

const deleteCar = async (plate) => {
    try {
        const car = await Car.findByPk(plate);
        if(!car){
            throw new Error("Car not found!");
        }
        if(car.status === "sold")
        {
            throw new Error('Car not available')
        }
        await car.destroy();
        return 'Car deleted successfully';
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting car:' + error);
    }
};

const isValidModel = (model) => {
    try {
        // Verifica se o modelo tem no máximo 50 caracteres
        return model.length <= 50;
    } catch (error) {
        console.error(error);
        throw new Error('Error validating model');
    }
};

const isValidYear = (year) => {
    try {
        // Verifica se o ano é maior que 2020
        return Number(year) > 2020;
    } catch (error) {
        console.error(error);
        throw new Error('Error validating year');
    }
};

const isValidStatus = (status) => {
    const validStatus = [
        'available',
        'sold',
    ]

    if (!validStatus.includes(status)) {
        throw new Error(`The status: ${status} it's not valid, status must be available or sold`);
    }
};

const isValidPlate = (plate) => {
    if (plate.length !== 7) {
        throw new Error('The plate must have exactly 7 characters.');
    }
};

const isValidPrice = (price) => {
    if(price <= 0){
        throw new Error('Price must be > 0')
    }
}


const isValidBrand = (brand) => {
    try {
        // Marcas famosas de carro
        const validBrands = [
            'Toyota',
            'Honda',
            'Ford',
            'Chevrolet',
            'Volkswagen',
            'BMW',
            'Mercedes-Benz',
            'Audi',
            'Nissan',
            'Hyundai',
            'Kia',
            'Volvo',
            'Mazda',
            'Subaru',
            'Lexus',
            'Tesla',
            'Ferrari',
            'Porsche',
            'Jaguar',
            'Land Rover'
        ];

        if (!validBrands.includes(brand)) {
            throw new Error('Invalid brand');
        }

        return true;
    } catch (error) {
        console.error(error);
        throw new Error('Error validating brand');
    }
};


module.exports = {
    getAllCars,
    getAllAvailablesCars,
    createCar,
    updateCar,
    deleteCar,
    isValidBrand
};
