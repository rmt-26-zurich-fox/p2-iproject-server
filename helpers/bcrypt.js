const bcrypt = require("bcryptjs");

const passwordHash = (password) => bcrypt.hashSync(password, 8);

const compareHash = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

module.exports = {
  passwordHash,
  compareHash,
};
