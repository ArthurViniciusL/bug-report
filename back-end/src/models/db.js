import { priorities, statuses } from '../utils/consts.js';

const db = {
  bugs: [
    {
      id: '1',
      userEmail: 'usuario1@exemplo.com',
      bugName: 'Erro no login',
      description: 'O botão de login não responde ao clique',
      priority: priorities.HIGH,
      status: statuses.NOT_STARTED,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      userEmail: 'usuario2@exemplo.com',
      bugName: 'Layout quebrado',
      description: 'O layout da página inicial está desalinhado em mobile',
      priority: priorities.MEDIUM,
      status: statuses.IN_PROGRESS,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  currentId: 2
};

export default  db;
