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

    kind: {
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
    timestamps: false // Desativa a inclusão dos campos createdAt e updatedAt
})

module.exports = People; 