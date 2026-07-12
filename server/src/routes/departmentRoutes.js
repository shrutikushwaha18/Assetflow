import express from 'express';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import { createDepartment, listDepartments, updateDepartment, assignRole } from '../controllers/departmentController.js';

const router = express.Router();

router.get('/', auth, listDepartments);
router.post('/', auth, role('Admin'), createDepartment);
router.put('/:id', auth, role('Admin'), updateDepartment);
router.post('/assign-role', auth, role('Admin'), assignRole);

export default router;
