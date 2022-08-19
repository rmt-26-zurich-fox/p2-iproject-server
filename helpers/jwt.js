const jwt = require("jsonwebtoken");

const THIZ_KEY = process.env.THIZ_KEY
const createToken = (payload) => jwt.sign(payload, THIZ_KEY);
const verifyToken = (token) => jwt.verify(token, THIZ_KEY);

module.exports = { createToken, verifyToken };