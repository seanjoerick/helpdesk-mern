import jwt from 'jsonwebtoken';

// Middleware to verify JWT from cookies
export const verifyToken = (req, res, next) => {
  // 1. Retrieve Token from Cookie
  const token = req.cookies.access_token;

  // 2. Check if Token is Present
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized!' });

  // 3. Verify Token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ success: false, message: 'Unauthorized!' });

    // 4. Attach User to Request Object
    req.user = user;

    // 5. Proceed to Next Middleware or Route Handler after user verify
    next();
  });
};

export const isAdmin = (req, res, next) => {
  console.log('Request User:', req.user); // Debug log
  if (req.user && req.user.roles &&  req.user.roles.includes('Admin')) {
    return next();
  } else {
    return res.status(403).json({ success: false, message: 'Access denied!' });
  }
};