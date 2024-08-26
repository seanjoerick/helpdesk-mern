import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema({
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  interaction_type: {
    type: String,
    enum: ['Comment', 'Update', 'Note'],
    default: 'Comment'
  }
}, { timestamps: true });

const Interaction = mongoose.model('Interaction', interactionSchema);

export default Interaction;
