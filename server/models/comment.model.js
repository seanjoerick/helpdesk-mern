import mongoose from 'mongoose';

const ticketCommentSchema = new mongoose.Schema({
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
  },
  formType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FormType',
    required: true
  }
}, { timestamps: true });

const TicketComment = mongoose.model('TicketComment', ticketCommentSchema);

export default TicketComment;
