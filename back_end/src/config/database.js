const chalk = require('chalk');
const { Sequelize } = require('sequelize');

// Configuração da conexão com o banco de dados MySQL
const sequelize = new Sequelize('db_person_buy_car', 'root', '314159', {
    host: 'localhost',
    dialect: 'mysql',
});

// Testar a conexão com o banco de dados
sequelize
    .authenticate()
    .then(() => {
        console.log(chalk.green('Conexão com o banco de dados estabelecida com sucesso.'));
    })
    .catch((error) => {
        console.error(chalk.red('Erro ao conectar-se ao banco de dados:', error));
    });

module.exports = sequelize;
