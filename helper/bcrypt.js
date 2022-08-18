const bcrypt = require("bcryptjs");

const hash = (password) => bcrypt.hashSync(password, 10);

const comparePassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

module.exports = {
  hash,
  comparePassword,
};
