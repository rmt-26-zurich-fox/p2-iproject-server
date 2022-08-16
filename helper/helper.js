const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const kunci = 'sharon_tnwjy'

//Password hash
const hash = (password) => bcrypt.hashSync(password)
const compare = (password, hashed) => bcrypt.compareSync(password, hashed)

//JWT Auth
const createToken = (payload) => jwt.sign(payload, kunci)
const verifyToken = (token) => jwt.verify(token, kunci)

module.exports = { hash, compare, createToken, verifyToken }