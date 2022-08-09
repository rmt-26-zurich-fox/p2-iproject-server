var request = require("request");
clientID = 'ccca96b9c84f4dedb96073f4d1c656ce'
clientSecret = 'c03aec4ae218485ba53565f7153dd749'

var options = {
    method: 'POST',
    url: 'https://oauth.fatsecret.com/connect/token',
    method: 'POST',
    auth: {
        user: clientID,
        password: clientSecret
    },
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
        'grant_type': 'client_credentials',
        'scope': 'basic'
    },
    json: true
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});