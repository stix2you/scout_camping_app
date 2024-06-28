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

   // Group by event_name
   const groupedData = data.reduce((acc, curr) => {
      const eventName = curr['Event Name'] || 'Unknown Event';
      if (!acc[eventName]) {
         acc[eventName] = { event_name: eventName, activities: [] };
      }
      acc[eventName].activities.push({
         activitytype: curr['Activity Type'] || '',
         day: curr['Day'] || '',
         duration: curr['Duration'] || '',
         start: curr['Start'] || '',
         end: curr['End'] || '',
         description: curr['Description'] || '',
         leader: curr['Leader'] || '',
         support: curr['Support'] || '',
         scout_mode: curr['Scout Mode'] || '',
         chief: curr['Chief'] || '',
         location: curr['Location'] || '',
         rain_alternative: curr['Rain Alternative'] || '',
         break_time: curr['Break Time'] || ''
      });
      return acc;
   }, {});

   return Object.values(groupedData);
}

module.exports = getSheetData;
