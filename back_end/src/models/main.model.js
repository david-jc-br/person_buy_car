const { DataTypes } = require('sequelize');
const db = require('../config/database');

const People = db.define('people', {
    cpf: {
        type: DataTypes.STRING(11),
        primaryKey: true,
        unique: true,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },

    profile: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
}, {
    timestamps: false, // Desativa a inclusão dos campos createdAt e updatedAt
    freezeTableName: true,
})


const Car = db.define('car', {
    plate: {
        type: DataTypes.STRING(7),
        primaryKey: true,
        unique: true,
    },
    brand: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('available', 'sold'),
        allowNull: false,
        defaultValue: "available",
    },
}, {
    timestamps: false, // Desativa a inclusão dos campos createdAt e updatedAt
    freezeTableName: true,
});

const Buy = db.define('buy', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dateBuy: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    buyer_cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
    },
    car_plate: {
        type: DataTypes.STRING(7),
        allowNull: false,
    },

}, {
    timestamps: false, // Desativa a inclusão dos campos createdAt e updatedAt
    freezeTableName: true,
});

People.hasMany(Buy, { foreignKey: 'buyer_cpf', sourceKey: 'cpf', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Buy.belongsTo(Buy, { foreignKey: 'buyer_cpf', sourceKey: 'cpf', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Car.hasOne(Buy, { foreignKey: 'car_plate', sourceKey: 'plate', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Buy.belongsTo(Buy, { foreignKey: 'car_plate', sourceKey: 'plate', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = {
    People,
    Car,
    Buy,
}
