import mongoose from 'mongoose';

const ticketCommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  request_no: {
    type: String,
    required: true,
    unique: true
  },
  device_no: {
    type: String
  },
  description_problem: {
    type: String,
    required: true
  },
  form_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FormType',
    required: true
  }
}, { timestamps: true });

const TicketComment = mongoose.model('TicketComment', ticketCommentSchema);

export default TicketComment;
