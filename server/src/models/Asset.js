import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    assetTag: { type: String, required: true, unique: true },
    serialNumber: { type: String, required: true, unique: true },
    acquisitionCost: { type: Number, default: 0 },
    location: { type: String, required: true },
    condition: { type: String, enum: ['Excellent', 'Good', 'Fair', 'Poor'], default: 'Good' },
    status: {
      type: String,
      enum: ['Available', 'Allocated', 'Reserved', 'Under Maintenance', 'Lost', 'Retired', 'Disposed'],
      default: 'Available'
    },
    shared: { type: Boolean, default: false },
    currentHolder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
    history: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Asset', assetSchema);
