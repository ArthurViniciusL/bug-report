import express from 'express';

import {
    getAllBugs,
    createBug,
    updateBug,
    deleteBug
} from '../controllers/bugs.js';


const router = express.Router();

// Rotas CRUD para bugs
router.get('/', getAllBugs);
router.post('/', createBug);
router.put('/:id', updateBug);
router.delete('/:id', deleteBug);

export default router;