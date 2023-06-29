const { DataTypes } = require('sequelize');
const db = require('../config/database');

const People  = db.define('people', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
    },

    address: {
        type: DataTypes.STRING(100),
    }
},{
    timestamps: false // Desativa a inclusão dos campos createdAt e updatedAt
})

module.exports = People; 