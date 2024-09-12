import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  date_started: {
    type: Date,
    default: Date.now
  },
  date_finished: {
    type: Date
  },
  requested_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  conducted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comment_box: {
    type: Boolean,
    default: false
  },
  action_taken: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'ongoing', 'completed'],
    default: 'pending'
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TicketComment'
  }]
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
