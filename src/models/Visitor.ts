import mongoose from 'mongoose';

const VisitorSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
  },
  count: {
    type: Number,
    default: 1,
  },
  lastVisited: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);
