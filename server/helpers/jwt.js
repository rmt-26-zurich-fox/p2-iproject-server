const jwt = require("jsonwebtoken");
const secretKey = 'INI_HARUSNYA_SECRET';

const signToken = (payload) => jwt.sign(payload, secretKey);
const verifyToken = (token) => jwt.verify(token, secretKey);

module.exports = { signToken, verifyToken };



