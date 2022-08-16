const jwt = require("jsonwebtoken");
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const key = process.env.SECRET_KEY;

const createToken = (payload) => jwt.sign(payload, key);

const verifyToken = (token) => jwt.verify(token, key);

module.exports = {
    createToken,
    verifyToken
};