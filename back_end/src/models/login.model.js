const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Login = db.define('Login', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
},{
    timestamps: false // Desativa a inclusão dos campos createdAt e updatedAt
});

module.exports = Login;
