const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Get the token from the request headers, assuming it's in the Authorization header
  const token = req.headers.authorization;

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, 'seyagubzade123', (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    
    // Attach the user ID to the request object
    req.user = decodedToken; // Assuming decodedToken contains the user ID
    // console.log(req.user)
    next();
  });
};

module.exports = authenticateUser;
