const bcrypt = require("bcryptjs");

const hashPass = (password) => bcrypt.hashSync(password, 10);
const comparePass = (password, hash) => bcrypt.compare(password, hash);

module.exports = { hashPass, comparePass }