const { google } = require('googleapis');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
   process.env.GOOGLE_CLIENT_ID,
   process.env.GOOGLE_CLIENT_SECRET,
   process.env.GOOGLE_REDIRECT_URL
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
