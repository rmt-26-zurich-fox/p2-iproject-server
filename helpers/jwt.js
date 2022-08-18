const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const createToken = (payload) => jwt.sign(payload, SECRET_KEY);
const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

module.exports = {
    createToken,
    verifyToken
}