const express = require('express');
const app = express();
const carRoutes = require('./routes/car.routes');
const peopleRoutes = require('./routes/people.routes');
const buyRoutes = require('./routes/buy.routes');
const loginRoutes = require('./routes/login.routes');
const db = require('./config/database');

// Middleware para processar o corpo das requisições como JSON
app.use(express.json());

// Rota inicial do aplicativo
app.get('/', (req, res) => {
    res.send('Bem-vindo à API de carros!');
});

// Rotas relacionadas aos carros
app.use('/cars', carRoutes);
app.use('/people', peopleRoutes);
app.use('/buy', buyRoutes);
app.use('/login', loginRoutes);

// Lidar com rotas não encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Rota não encontrada.' });
});

// Lidar com erros globais
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
});

// Sincronizar os modelos com o banco de dados
db.sync()
    .then(() => {
        console.log('Tabelas do banco de dados sincronizadas com sucesso.');
        // Iniciar o servidor após a sincronização
        app.listen(3000, () => {
            console.log('Servidor iniciado na porta 3000.');
        });
    })
    .catch((error) => {
        console.error('Erro ao sincronizar as tabelas do banco de dados:', error);
    });
