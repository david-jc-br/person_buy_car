const express = require('express');
const chalk = require('chalk');
const https = require('https');
const cors = require('cors');
const fs = require('fs');
const app = express();
const carRoutes = require('./routes/car.routes');
const buyRoutes = require('./routes/buy.routes');
const peopleRoutes = require('./routes/people.routes');
const db = require('./config/database');

// Middleware para processar o corpo das requisições como JSON
app.use(express.json());
app.use(cors());

// Rota inicial do aplicativo
app.get('/', (req, res) => {
    res.send('Bem-vindo à API de carros!');
});

// Rotas relacionadas aos carros
app.use('/car', carRoutes);
app.use('/people', peopleRoutes);
app.use('/buy', buyRoutes);

// Lidar com rotas não encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Rota não encontrada.' });
});

// Lidar com erros globais
app.use((err, req, res, next) => {
    console.error(err);
    if (err.status === 500) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});

// Sincronizar os modelos com o banco de dados
db.sync()
    .then(() => {
        console.log(chalk.blue('\nDatabase tables synchronized successfully.'));
        // Iniciar o servidor após a sincronização
        const options = {
            key: fs.readFileSync('../SSL/localhost-key.pem'),
            cert: fs.readFileSync('../SSL/localhost.pem')
        };
        https.createServer(options, app).listen(3001, () => {
            console.log(chalk.green('\nServer started on port 3001 using HTTPS!'));
            console.log(chalk.yellow('\nhttps://localhost:3001/'));
        });
    })
    .catch((error) => {
        console.error(chalk.red('Erro ao sincronizar as tabelas do banco de dados:'), error);
    });
