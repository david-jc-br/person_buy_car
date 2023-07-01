const Car = require('../models/car.model');
const People = require('../models/people.model')

const getAllCars = async () => {
    try {
        const cars = await Car.findAll();
        return cars;
    } catch (error) {
        console.error(error);
        throw new Error('Error when searching cars');
    }
};

const getMyCars = async (owner_cpf) => {
    try {
        const person = await People.findByPk(owner_cpf);

        if (!person) {
            throw new Error('Person not found');
        }

        const myCars = await Car.findAll({
            where: {
                owner_cpf: person.cpf
            }
        });

        return myCars;
        
    } catch (error) {
        console.error(error);
        throw new Error('Error when looking for person\'s cars');
    }
};

const createCar = async (carData) => {
    const { brand, model, year, owner_cpf } = carData;
    try {

        const car = await Car.create({ brand, model, year, owner_cpf: owner_cpf || null });
        return car;
    } catch (error) {
        console.error(error);
        throw new Error('Error when create a new car');
    }
};

const updateCarOwner = async (id, owner_cpf) => {
    try {
        const car = await Car.findByPk(id);
        if (!car) {
            throw new Error('Car not found');
        }

        car.owner_cpf = owner_cpf;
        await car.save();

        return car;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating car owner');
    }
};

const updateCar = async (id, carData) => {
    const { brand, model, year, plate} = carData;
    try {

        const car = await Car.findByPk(id);
        if (!car) {
            throw new Error('Car not found');
        }

        car.brand = brand;
        car.model = model;
        car.year = year;
        car.plate = plate;
        await car.save();
        return car;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating car');
    }
};

const deleteCar = async (id) => {
    try {
        const car = await Car.findByPk(id);
        await car.destroy();
        return 'Car deleted successfully';
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting car');
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

    if (!(carBrands.includes(brand))) {
        throw new Error('A marca não é válida');
    }
};


module.exports = { getAllCars, getMyCars, createCar, updateCar, updateCarOwner, deleteCar };
