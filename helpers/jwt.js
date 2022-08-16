const jwt = require('jsonwebtoken');

const secretkey = process.env.SECRET_KEY

const generateToken = (payload) => jwt.sign(payload, secretkey)

const verifytoken = (token) => jwt.verify(token, secretkey)

module.exports = { generateToken, verifytoken }