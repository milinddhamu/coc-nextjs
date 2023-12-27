const jwt = require('jsonwebtoken');

const generateAnonymousToken = () => {
  const secretKey = process.env.JWT_SECRET;
  const payload = {
    userId: Math.random().toString(36).substring(2), // Generate a random userId
    anonymous: true,
  };
  const options = { expiresIn: '24h' };
  return jwt.sign(payload, secretKey, options);
};




module.exports = { generateAnonymousToken };