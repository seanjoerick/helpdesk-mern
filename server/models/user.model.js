import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUPT3pWQb7bPoo9f-blaLMAHC79K6eGSsTrQ&s" 
  },
  roles: {
    type: [String],
    enum: ['admin', 'user'],
    default: ['user'], 
    required: true
  },
  department: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  }],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
