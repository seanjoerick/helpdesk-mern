import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  service_request_no: {
    type: String,
    required: true,
    unique: true,
  },
  date_finished: {
    type: Date,
  },
  requested_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  conducted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comment_box: {
    type: Boolean,
    default: false,
  },
  action_taken: {
    type: String,
  },
  status: {
    type: String,
    enum: ['ongoing', 'pending', 'completed'],
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TicketComment',
  }],
  category: {
    type: String,
    enum: ['Service Request', 'Network Request', 'Web Request'],
    required: true,
  }
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
