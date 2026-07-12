import express from 'express';
import auth from '../middleware/auth.js';
import { createNotification, listNotifications } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', auth, listNotifications);
router.post('/', auth, createNotification);

export default router;
