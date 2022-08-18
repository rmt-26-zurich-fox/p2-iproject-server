let jwt = require("jsonwebtoken")
const key = process.env.key

let makeJwt = (payload) => jwt.sign(payload, key)

let verifyJwt = (token) => jwt.verify(token, key)

module.exports = {makeJwt, verifyJwt}