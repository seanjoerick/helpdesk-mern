import mongoose from 'mongoose';

const ticketCommentSchema = new mongoose.Schema({
  formType: {
    type: String,
    enum: ['Web', 'Network', 'Service'],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deviceNo: {
    type: String
  },
  descriptionProblem: {
    type: String,
    required: true
  }
}, { timestamps: true });

const TicketComment = mongoose.model('TicketComment', ticketCommentSchema);

export default TicketComment;
