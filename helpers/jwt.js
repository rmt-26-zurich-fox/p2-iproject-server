const jwt = require("jsonwebtoken");

const secret_key = "secretlah";
const createToken = (payload) => jwt.sign(payload, secret_key);
const verifyToken = (token) => jwt.verify(token, secret_key);

module.exports = { createToken, verifyToken };