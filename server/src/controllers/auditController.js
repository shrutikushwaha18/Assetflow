import Audit from '../models/Audit.js';

export const listAudits = async (_req, res, next) => {
  try {
    const audits = await Audit.find().sort({ createdAt: -1 });
    res.json(audits);
  } catch (error) {
    next(error);
  }
};

export const createAudit = async (req, res, next) => {
  try {
    const audit = await Audit.create(req.body);
    res.status(201).json(audit);
  } catch (error) {
    next(error);
  }
};

export const updateAudit = async (req, res, next) => {
  try {
    const audit = await Audit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(audit);
  } catch (error) {
    next(error);
  }
};
