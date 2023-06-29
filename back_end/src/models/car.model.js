const { DataTypes } = require('sequelize');
const db = require('../config/database');
const People = require('./people.model');

const Car = db.define('car', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    plate: {
        type: DataTypes.STRING(7),
        allowNull: false,
        unique: true,
    },
},{
    timestamps: false // Desativa a inclusão dos campos createdAt e updatedAt
});

Car.belongsTo(People, { foreignKey: 'owner_id' });

module.exports = Car;
