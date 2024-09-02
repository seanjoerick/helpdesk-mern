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
      if (req.body.password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters!' });
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if ((req.body.username && req.body.username.includes(' ')) || 
        (req.body.password && req.body.password.includes(' '))) {
      return res.status(400).json({ success: false, message: 'Username and Password cannot contain spaces' });
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

