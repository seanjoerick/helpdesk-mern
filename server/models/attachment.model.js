import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  file_url: {
    type: String,
    required: true
  },
  file_name: {
    type: String,
    required: true
  },
  file_type: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Attachment = mongoose.model('Attachment', attachmentSchema);

export default Attachment;
