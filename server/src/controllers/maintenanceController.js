import Maintenance from '../models/Maintenance.js';
import Asset from '../models/Asset.js';

export const listMaintenance = async (_req, res, next) => {
  try {
    const maintenance = await Maintenance.find().populate('asset').populate('requestedBy');
    res.json(maintenance);
  } catch (error) {
    next(error);
  }
};

export const createMaintenance = async (req, res, next) => {
  try {
    const maintenance = await Maintenance.create(req.body);
    res.status(201).json(maintenance);
  } catch (error) {
    next(error);
  }
};

export const updateMaintenance = async (req, res, next) => {
  try {
    const maintenance = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (req.body.status === 'Approved') {
      await Asset.findByIdAndUpdate(maintenance.asset, { status: 'Under Maintenance' });
    }
    if (req.body.status === 'Resolved') {
      await Asset.findByIdAndUpdate(maintenance.asset, { status: 'Available' });
    }
    res.json(maintenance);
  } catch (error) {
    next(error);
  }
};
