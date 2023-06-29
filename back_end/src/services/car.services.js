const Car = require('../models/car.model');

const getAllCars = async () => {
    try {
        const cars = await Car.findAll();
        return cars;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar os carros');
    }
};

const createCar = async (carData) => {
    const { brand, model, year, plate, owner_id } = carData;
    try {
        // ====Validação de Dados====

        isValidBrand(brand);isValidatePlate(plate);
        isValidateYear(year);

        const car = await Car.create({ brand, model, year, plate, owner_id });
        return car;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao criar um novo carro');
    }
};

const updateCar = async (id, carData) => {
    const { brand, model, year, plate, owner_id } = carData;
    try {
        isValidBrand(brand);isValidatePlate(plate);
        isValidateYear(year);

        const car = await Car.findByPk(id);
        if (!car) {
            throw new Error('Carro não encontrado');
        }

        car.brand = brand;
        car.model = model;
        car.year = year;
        car.plate = plate;
        car.owner_id = owner_id;
        await car.save();
        return car;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao atualizar o carro');
    }
};

const deleteCar = async (id) => {
    try {
        const car = await newFunction();
        await car.destroy();
        return 'Carro excluído com sucesso';
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao excluir o carro');
    }
};

// ======VALIDATE=======

const isValidBrand = (brand) => {
    const carBrands = [
        'Ford',
        'Chevrolet',
        'Toyota',
        'Honda',
        'Volkswagen',
        'BMW',
        'Mercedes-Benz',
        'Audi',
        'Nissan',
        'Hyundai',
        'Kia',
        'Volvo',
        'Subaru',
        'Mazda',
        'Tesla',
        'Ferrari',
        'Lamborghini',
        'Porsche',
        'Jaguar',
        'Land Rover'
    ];

    if(!(carBrands.includes(brand))){
        throw new Error('A marca não é válida');
    }
};

const isValidateYear = (year) => {
    if (year < 2015) {
        throw new Error('O ano do carro deve ser igual ou superior a 2015');
    }
}

const isValidatePlate = (plate) => {
    if (plate.length != 7) {
        throw new Error('A quantidade de caracteres da placa deve ser igual a 7');
    }
    return
};

module.exports = { getAllCars, createCar, updateCar, deleteCar };
