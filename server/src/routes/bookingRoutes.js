import express from 'express';
import auth from '../middleware/auth.js';
import { createBooking, listBookings, updateBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.get('/', auth, listBookings);
router.post('/', auth, createBooking);
router.put('/:id', auth, updateBooking);

export default router;
