const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
}

const verifyToken = (access_token) => {
  return jwt.verify(access_token, SECRET_KEY);
}

module.exports = { signToken, verifyToken }

