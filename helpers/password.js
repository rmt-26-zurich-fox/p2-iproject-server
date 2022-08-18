const bcrypt = require('bcrypt');

const hashpassword = (plainpass) => {
    return bcrypt.hashSync(plainpass, 6)
}

const verifypassword = (plainpass, passwordinDB) => {
    return bcrypt.compareSync(plainpass, passwordinDB)
}

module.exports = { hashpassword, verifypassword }