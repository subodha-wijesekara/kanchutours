import mongoose from 'mongoose';

const BookingSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
  },
  phone: {
    type: String,
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date.'],
  },
  people: {
    type: String,
    required: [true, 'Please provide the number of travelers.'],
  },
  interest: {
    type: String,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ['unread', 'read'],
    default: 'unread',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.BookingSubmission || mongoose.model('BookingSubmission', BookingSubmissionSchema);
