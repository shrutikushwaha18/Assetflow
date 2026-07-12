import express from 'express';
import auth from '../middleware/auth.js';
import { createAudit, listAudits, updateAudit } from '../controllers/auditController.js';

const router = express.Router();

router.get('/', auth, listAudits);
router.post('/', auth, createAudit);
router.put('/:id', auth, updateAudit);

export default router;
