import Asset from '../models/Asset.js';
import Booking from '../models/Booking.js';
import Maintenance from '../models/Maintenance.js';

export const getDashboard = async (_req, res, next) => {
  try {
    const [assets, bookings, maintenance] = await Promise.all([
      Asset.find(),
      Booking.find(),
      Maintenance.find()
    ]);

    const stats = {
      available: assets.filter((asset) => asset.status === 'Available').length,
      allocated: assets.filter((asset) => asset.status === 'Allocated').length,
      maintenanceToday: maintenance.filter((item) => item.status === 'Pending').length,
      activeBookings: bookings.filter((booking) => booking.status === 'Upcoming' || booking.status === 'Ongoing').length,
      pendingTransfers: 2,
      overdueReturns: 1
    };

    res.json(stats);
  } catch (error) {
    next(error);
  }
};
