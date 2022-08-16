const bcryptjs = require('bcryptjs')

const hashPassword = (password) => bcryptjs.hashSync(password, 10);
const compareHash = (password, hashedPassword) => bcryptjs.compareSync(password, hashedPassword);

module.exports = { hashPassword, compareHash };