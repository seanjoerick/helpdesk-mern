import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  requestNo: {
    type: String,
    required: true,
    unique: true,
  },
  date_started: {
    type: Date,
    default: Date.now,
  },
  date_finished: {
    type: Date,
  },
  conducted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  action_taken: { 
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'ongoing', 'completed'],
    default: 'pending',
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TicketComment',
  }],
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
