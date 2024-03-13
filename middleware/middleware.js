const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return     res.status(403).json({ message: 'some error occured in token', err });
    // Forbidden
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
}

module.exports = {authenticateToken};