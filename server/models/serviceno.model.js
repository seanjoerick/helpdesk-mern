import mongoose from 'mongoose';

const requestNumberSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    unique: true
  },
  lastNumber: {
    type: Number,
    required: true
  }
});

const RequestNumber = mongoose.model('RequestNumber', requestNumberSchema);

export default RequestNumber;
