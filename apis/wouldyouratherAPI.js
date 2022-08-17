const axios = require("axios");

const wyrapi = axios.create({
  headers: {
    "X-RapidAPI-Key": "100f266a20msh742b2f382f4dd34p15ca2cjsna70b359f41fc",
    "X-RapidAPI-Host": "would-you-rather.p.rapidapi.com",
  },
});

module.exports = wyrapi;
