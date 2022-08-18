const axios = require('axios')


const weatherAxios = axios.create({
    baseURL: 'https://weatherbit-v1-mashape.p.rapidapi.com/'
})

module.exports = weatherAxios;