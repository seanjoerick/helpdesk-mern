import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true 
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: "https://i.imgur.com/8B5KF5e.jpeg" 
  },
  roles: [{
    type: String,
    enum: ['techsupport', 'user'], 
    required: true
  }],
  department: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
