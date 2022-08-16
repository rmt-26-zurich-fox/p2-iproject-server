const jwt = require('jsonwebtoken')
const secret = 'secretbanget'

const signToken = (token) => jwt.sign(token, secret)
const verifyToken = (payload) => jwt.verify(payload, secret)

module.exports = {
    signToken,
    verifyToken
}