import express from 'express';
import auth from '../middleware/auth.js';
import { createMaintenance, listMaintenance, updateMaintenance } from '../controllers/maintenanceController.js';

const router = express.Router();

router.get('/', auth, listMaintenance);
router.post('/', auth, createMaintenance);
router.put('/:id', auth, updateMaintenance);

export default router;
