import mongoose from 'mongoose';

const formTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });

const FormType = mongoose.model('FormType', formTypeSchema);

export default FormType;
