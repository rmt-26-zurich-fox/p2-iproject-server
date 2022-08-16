const jwt = require("jsonwebtoken");

const secret_key = process.env.secret_key;
const createToken = (payload) => jwt.sign(payload, secret_key);
const verifyToken = (token) => jwt.verify(token, secret_key);

module.exports = { createToken, verifyToken };
