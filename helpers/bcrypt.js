const bcryptjs = require('bcryptjs');

const BCRYPT_SALT = process.env.BCRYPT_SALT;

const hashPassword = (rawPassword) => {
  return bcryptjs.hashSync(rawPassword, +BCRYPT_SALT);
}

const comparePassword = (rawPassword, hashedPassword) => {
  return bcryptjs.compareSync(rawPassword, hashedPassword);
}

module.exports = { hashPassword, comparePassword }