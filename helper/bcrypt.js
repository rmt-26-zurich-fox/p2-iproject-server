const bcrypt = require('bcrypt');

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

function comparePassword(password, comparedPasswords) {
    return bcrypt.compareSync(password, comparedPasswords);
}


module.exports = {
    hashPassword,
    comparePassword
};