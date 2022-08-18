const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const token = (payload) => jwt.sign(payload, secret);

const verify = (token) => jwt.verify(token, secret);

module.exports = {
  token,
  verify,
};
