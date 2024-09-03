import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

  export const test = (req, res) => {
    res.json({ message: 'API is working!' });
  };
  
  export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to update this user.' });
    }
    // If there's a password
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
          username: req.body.username, 
          password: req.body.password, 
          department: req.body.department, 
        }
      }, { new: true });
  
      const { password, ...rest } = updatedUser._doc;
  
      res.status(200).json(rest);
  
    } catch (error) { 
      next(error);    
    }
  };
  
  
  export const signout = (req, res, next) => {
    try {
      res.clearCookie('access_token').status(200).json('User has been signed out');
    } catch (error) {
      next(error);
    }
  };

