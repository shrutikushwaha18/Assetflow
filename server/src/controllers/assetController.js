import Asset from '../models/Asset.js';

export const listAssets = async (_req, res, next) => {
  try {
    const assets = await Asset.find().sort({ createdAt: -1 });
    res.json(assets);
  } catch (error) {
    next(error);
  }
};

export const createAsset = async (req, res, next) => {
  try {
    const assetTag = `AF-${Math.floor(1000 + Math.random() * 9000)}`;
    const asset = await Asset.create({ ...req.body, assetTag });
    res.status(201).json(asset);
  } catch (error) {
    next(error);
  }
};

export const updateAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(asset);
  } catch (error) {
    next(error);
  }
};
