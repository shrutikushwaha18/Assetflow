import mongoose from 'mongoose';

const auditSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
    location: { type: String, default: '' },
    dateRange: { start: Date, end: Date },
    auditors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
    findings: [{ asset: String, result: String, notes: String }],
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Audit', auditSchema);
