import db from '../models/db.js';
import { priorities, statuses } from '../utils/consts.js';

const getAllBugs = (req, res) => {
    res.json(db.bugs);
};

const createBug = (req, res) => {
    const { userEmail, bugName, description, priority } = req.body;

    if (!userEmail || !description || !priority) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    if (description.length > 500) {
        return res.status(400).json({ error: 'Descrição muito longa (máx. 500 caracteres)' });
    }

    const newBug = {
        id: (++db.currentId).toString(),
        userEmail,
        bugName: bugName || '',
        description,
        priority,
        status: statuses.NOT_STARTED,
        createdAt: new Date().toISOString()
    };

    db.bugs.push(newBug);
    res.status(201).json(newBug);
};

const updateBug = (req, res) => {
    const { id } = req.params;
    const bugIndex = db.bugs.findIndex(bug => bug.id === id);

    if (bugIndex === -1) {
        return res.status(404).json({ error: 'Bug não encontrado' });
    }

    const allowedUpdates = ['bugName', 'description', 'priority', 'status'];
    const updates = req.body;

    const isValidUpdate = Object.keys(updates).every(key => allowedUpdates.includes(key));
    if (!isValidUpdate) {
        return res.status(400).json({ error: 'Atualizações inválidas' });
    }

    // Atualiza apenas os campos permitidos
    const updatedBug = { ...db.bugs[bugIndex], ...updates };
    db.bugs[bugIndex] = updatedBug;

    res.json(updatedBug);
};

const deleteBug = (req, res) => {
    const { id } = req.params;
    const bugIndex = db.bugs.findIndex(bug => bug.id === id);

    if (bugIndex === -1) {
        return res.status(404).json({ error: 'Bug não encontrado' });
    }

    db.bugs.splice(bugIndex, 1);
    res.status(204).end();
};

export {
    getAllBugs,
    createBug,
    updateBug,
    deleteBug
};