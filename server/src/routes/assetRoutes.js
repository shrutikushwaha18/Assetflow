import express from 'express';
import auth from '../middleware/auth.js';
import { createAsset, listAssets, updateAsset } from '../controllers/assetController.js';

const router = express.Router();

router.get('/', auth, listAssets);
router.post('/', auth, createAsset);
router.put('/:id', auth, updateAsset);

export default router;
