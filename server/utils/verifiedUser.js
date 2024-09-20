import jwt from 'jsonwebtoken';

// Middleware to verify JWT from cookies
export const verifyToken = (req, res, next) => {
  // Retrieve Token from Cookie
  const token = req.cookies.access_token;

  // Check if Token is Present
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized!' });

  // Verify Token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ success: false, message: 'Unauthorized!' });

    // Attach User to Request Object
    req.user = user;

    // Proceed to Next Middleware or Route Handler after user verify
    next();
  });
};

export const isAdmin = (req, res, next) => {
  console.log('Request User:', req.user);
  if (req.user && req.user.roles &&  req.user.roles.includes('Admin')) {
    return next();
  } else {
    return res.status(403).json({ success: false, message: 'Access denied!' });
  }
};