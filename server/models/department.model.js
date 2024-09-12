import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, { timestamps: true });

const Department = mongoose.model('Department', departmentSchema);

export default Department;
