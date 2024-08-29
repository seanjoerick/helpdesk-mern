import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const test = (req, res) => {
    res.json({ message: 'API is working!' });
  };
  
export const updateUser = async (req, res, next) => {
  const { department, username, email, password, roles } = req.body;
  
  if (req.user.id !== req.params.id) return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to update this user.' });
  
  try {
   if(req.body.password) {
    req.body.password =  bcryptjs.hashSync(req.body.password, 10);
      }
    const updateUser = await User.findByIdAndUpdate({})

  } catch (error) {
    next(error)
  }




}

export const signout = (req, res, next) => {
    try {
      res.clearCookie('access_token').status(200).json('User has been signed out');
    } catch (error) {
      next(error);
    }
  };

  