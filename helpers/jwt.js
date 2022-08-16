const jwt = require("jsonwebtoken")
const key = process.env.SECRET_KEY

const signToken = (token) => jwt.sign(token, key)
const verifyToken = (token) => jwt.verify(token, key)

module.exports = { signToken, verifyToken }