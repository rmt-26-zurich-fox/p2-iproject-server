const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const kunci = 'sharon_tnwjy'

//Password hash
const hash = (password) => bcrypt.hashSync(password)
const compare = (password, hashed) => bcrypt.compareSync(password, hashed)

//JWT Auth
const createToken = (payload) => jwt.sign(payload, kunci)
const verifyToken = (token) => jwt.verify(token, kunci)

// Pagination
const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = (page - 1) * limit
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: product } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, product, totalPages, currentPage };
};

module.exports = { hash, compare, createToken, verifyToken, getPagination, getPagingData }