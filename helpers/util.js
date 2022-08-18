import oauth from "oauth";

const oauthCallback = process.env.FRONTEND_URL;
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
const _oauth = new oauth.OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  CONSUMER_KEY, // consumer key
  CONSUMER_SECRET, // consumer secret
  "1.0",
  oauthCallback,
  "HMAC-SHA1"
);

export const getOAuthRequestToken = () => {
  return new Promise((resolve, reject) => {
    _oauth.getOAuthRequestToken(
      (error, oauth_token, oauth_token_secret, results) => {
        if (error) {
          reject(error);
        } else {
          console.log({ oauth_token, oauth_token_secret, results });
          resolve({ oauth_token, oauth_token_secret, results });
        }
      }
    );
  });
};
