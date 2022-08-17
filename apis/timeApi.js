const axios = require('axios')


const timeAxios = axios.create({
    baseURL: 'https://timeapi.io/api/'
})

module.exports = timeAxios;