const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Decode the base64 encoded service account key
const serviceAccountKeyBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64;
const serviceAccountKeyJson = Buffer.from(serviceAccountKeyBase64, 'base64').toString('utf-8');
const serviceAccountKey = JSON.parse(serviceAccountKeyJson);

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const auth = new google.auth.JWT(
   serviceAccountKey.client_email,
   null,
   serviceAccountKey.private_key,
   SCOPES
);

const sheets = google.sheets({ version: 'v4', auth });

const getSheetData = async (spreadsheetId, range) => {
   try {
      const response = await sheets.spreadsheets.values.get({
         spreadsheetId,
         range,
      });
      return response.data.values;
   } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
      throw error;
   }
};

module.exports = getSheetData;
