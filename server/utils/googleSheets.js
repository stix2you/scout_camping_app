const { google } = require('googleapis');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

// Load the service account key from the environment variable
const key = JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64, 'base64').toString('utf8'));

const auth = new google.auth.GoogleAuth({
   credentials: key,
   scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function getSheetData(spreadsheetId, range) {
   const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
   });
   const rows = response.data.values;
   if (rows.length) {
      return processRows(rows);
   } else {
      console.log('No data found.');
      return [];
   }
}

function processRows(rows) {
   const headers = rows[0];
   const data = rows.slice(1).map(row => {
      let rowData = {};
      headers.forEach((header, index) => {
         if (header) {
            rowData[header] = row[index];
         }
      });
      return rowData;
   });
   return data;
}

module.exports = getSheetData;
