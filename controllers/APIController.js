const axios = require("axios");

const RAPID_API_KEY_FOOTBAL_XG = process.env.RAPID_API_KEY_FOOTBAL_XG;
const RAPID_API_HOST_FOOTBAL_XG = process.env.RAPID_API_HOST_FOOTBAL_XG;

const rapidApiFootball = async (req, res, next) => {
  try {

    const options = {
      method: 'GET',
      url: `https://${RAPID_API_HOST_FOOTBAL_XG}/seasons/12310/fixtures/`,
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY_FOOTBAL_XG,
        'X-RapidAPI-Host': RAPID_API_HOST_FOOTBAL_XG
      }
    };

    // const options = {
    //   method: 'GET',
    //   url: 'https://football-xg-statistics.p.rapidapi.com/seasons/8202/fixtures/',
    //   headers: {
    //     'X-RapidAPI-Key': 'd449ca69a8mshc0697af0e917851p11947cjsndf634d6a5583',
    //     'X-RapidAPI-Host': 'football-xg-statistics.p.rapidapi.com'
    //   }
    // };
    
    const response = await axios.request(options);

    console.log(response.data);

    res.status(200).json(response.data)
    
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { 
  rapidApiFootball 
}