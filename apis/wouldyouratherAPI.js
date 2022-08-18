const axios = require("axios");

const wyrapi = axios.create({
  headers: {
    "X-RapidAPI-Key": "c3d8c0ef6cmsh2d5fb826d462ed8p14fc24jsne08bfa3b2144",
    "X-RapidAPI-Host": "would-you-rather.p.rapidapi.com",
  },
});

module.exports = wyrapi;
