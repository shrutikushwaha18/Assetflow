import Booking from '../models/Booking.js';

export const listBookings = async (_req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ startTime: 1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const overlap = await Booking.findOne({
      resourceName: req.body.resourceName,
      $or: [
        { startTime: { $lt: req.body.endTime }, endTime: { $gt: req.body.startTime } }
      ]
    });

    if (overlap) {
      return res.status(409).json({ message: 'Resource is already booked for the selected time' });
    }

    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

export const updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(booking);
  } catch (error) {
    next(error);
  }
};
