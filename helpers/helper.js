const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 8);
};
const compareHash = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY

const createToken = (payload) => jwt.sign(payload, secretKey);

const verifyToken = (token) => jwt.verify(token, secretKey);

module.exports = { hashPassword, compareHash, createToken, verifyToken };