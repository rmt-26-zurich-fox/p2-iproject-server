const axios = require('axios')


const newsAxios = axios.create({
    baseURL: 'http://api.mediastack.com/v1/'
})

module.exports = newsAxios;