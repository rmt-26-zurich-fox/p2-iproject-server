const jwt = require('jsonwebtoken')

const keys = process.env.SECRET_KEY

const createToken = (payload) => jwt.sign(payload, keys)

const verifyToken = (token) => jwt.verify(token, keys)

module.exports = { createToken, verifyToken}