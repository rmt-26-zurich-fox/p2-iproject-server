const jwt = require("jsonwebtoken");
const notSecure = process.env.SECRET_KEY;

const createToken = (payload) => jwt.sign(payload, notSecure);

const verifyingToken = (token) => jwt.verify(token, notSecure);

module.exports = {
  createToken,
  verifyingToken,
};
