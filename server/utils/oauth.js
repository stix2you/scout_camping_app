const { google } = require('googleapis');

// Load environment variables from .env file
require('dotenv').config();

const redirectUrl = process.env.NODE_ENV === 'production' ? process.env.GOOGLE_REDIRECT_URL_PRODUCTION : process.env.GOOGLE_REDIRECT_URL_LOCAL;

const oauth2Client = new google.auth.OAuth2(
   process.env.GOOGLE_CLIENT_ID,
   process.env.GOOGLE_CLIENT_SECRET,
   redirectUrl
);

// Scopes required by the application
const SCOPES = [
   'openid',
   'profile',
   'email',
];

function getAuthUrl() {
   const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
   });
   return authUrl;
}

module.exports = {
   oauth2Client,
   getAuthUrl,
};
