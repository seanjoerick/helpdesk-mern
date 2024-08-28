import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

// Middleware to verify JWT from cookies
export const verifyToken = (req, res, next) => {
    
  // 1. Retrieve Token from Cookie
  const token = req.cookies.access_token;

  // 2. Check if Token is Present
  if (!token) return next(errorHandler(401, 'You are not authorized'));

  // 3. Verify Token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    // 4. Attach User to Request Object
    req.user = user;
    
    // 5. Proceed to Next Middleware or Route Handler
    next();
  });
};
