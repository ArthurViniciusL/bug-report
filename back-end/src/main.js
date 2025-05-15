import server from './config/server.js';

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`API disponível em http://localhost:${PORT}/bugs`);
});