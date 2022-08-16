const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "inirahasia";

const createToken = (payload) => jwt.sign(payload, secretKey);

const verifyToken = (token) => jwt.verify(token, secretKey);

const hashPassword = (password) => bcrypt.hashSync(password, 10);
const compareHash = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
  hashPassword,
  compareHash,
  createToken,
  verifyToken,
};
