import express from 'express';
import cors from 'cors';
const server = express();

import router from '../routes/bugs.js';

// Middlewares
server.use(cors());
server.use(express.json());

// Rotas
server.use('/api/bugs', router);

// Rota de saúde
server.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// Middleware de erro
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});

export default server;