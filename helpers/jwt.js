const jwt = require("jsonwebtoken");
const key = `ini_kunci_ga_aman`;

const createToken = (payload) => jwt.sign(payload, key);
const verifyToken = (token) => jwt.verify(token, key);

module.exports = {
  createToken,
  verifyToken,
};
