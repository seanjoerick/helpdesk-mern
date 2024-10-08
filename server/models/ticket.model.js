import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  requestNo: {
    type: String,
    required: true,
    unique: true,
  },
  date_started: {
    type: Date,
  },
  date_finished: {
    type: Date,
  },
  conducted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action_taken: { 
    type: String,
  },
  recommendation: { 
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
