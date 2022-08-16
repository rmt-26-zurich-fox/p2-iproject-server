const bcrypt = require("bcryptjs")

let hashPass = (password) => bcrypt.hashSync(password, 10)

let verifyPass = (password, hashPassword) => bcrypt.compareSync(password, hashPassword)

module.exports = {hashPass, verifyPass}