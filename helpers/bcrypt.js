const bcrypt = require('bcryptjs')

const hashPassword = (password) => bcrypt.hashSync(password, 10)
const verifyPassword = (pass, hash) => bcrypt.compareSync(pass, hash)

module.exports = {
    hashPassword,
    verifyPassword
}