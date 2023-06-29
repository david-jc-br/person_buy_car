const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Car = require('./car.model');
const People = require('./people.model');

const Buy = db.define('Buy', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    purchase_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},{
    timestamps: false // Desativa a inclusão dos campos createdAt e updatedAt
});

Buy.belongsTo(Car, { foreignKey: 'car_id' });
Buy.belongsTo(People, { foreignKey: 'buyer_id' });

module.exports = Buy;
