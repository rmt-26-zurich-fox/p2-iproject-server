const jwt = require('jsonwebtoken');

const secretkey = "KUCING_MABOK"

const generateToken = (payload) => jwt.sign(payload, secretkey)

const verifytoken = (token) => jwt.verify(token, secretkey)

module.exports = { generateToken, verifytoken }