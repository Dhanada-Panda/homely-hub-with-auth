const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token.split(' ')[1], 'your_secret_key');
    req.userId = verified.userId;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid token' });
  }
};

module.exports = { verifyToken };
