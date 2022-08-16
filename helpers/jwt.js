const jwt = require("jsonwebtoken");
const secretKeys = "ini_masih_biasa_aja";

const createToken = (payload) => jwt.sign(payload, secretKeys);

const verifyToken = (token) => jwt.verify(token, secretKeys);

module.exports = {
  createToken,
  verifyToken,
};
