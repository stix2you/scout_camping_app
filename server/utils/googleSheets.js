const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');
const path = require('path');
const fs = require('fs');

const ensureKeys = (activity) => {
   return {
      activity_type: activity['Activity Type'] || '',
      duration: activity.Duration || '',
      start: activity.Start || '',
      end: activity.End || '',
      description: activity.Description || '',
      leader: activity.Leader || '',
      support: activity.Support || '',
      scout_mode: activity['Scout Mode'] || '',
      chief: activity.Chief || '',
      location: activity.Location || '',
      day: activity.day || ''
   };
};

const getSheetData = async (spreadsheetId, range) => {
   const auth = await authenticate({
      keyfilePath: path.join(__dirname, '../config/service-account-key.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
   });
   const sheets = google.sheets({ version: 'v4', auth });

   const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
   });

   const rows = response.data.values;

   if (!rows || rows.length === 0) {
      console.error('No data found.');
      return [];
   }

   const headers = rows[0];
   const data = rows.slice(1).map(row => {
      return headers.reduce((acc, header, index) => {
         acc[header] = row[index];
         return acc;
      }, {});
   });

   let currentDay = '';
   const events = data.reduce((acc, row) => {
      if (row['Activity Type'] === 'Day') {
         currentDay = row.Description; // Assuming description contains the day
      } else if (row['Activity Type'] && row['Activity Type'] !== 'Activity Type') {
         const activity = ensureKeys({ ...row, day: currentDay });
         console.log('Activity being added:', JSON.stringify(activity, null, 2)); // Log each activity being added
         acc.push(activity);
      }
      return acc;
   }, []);

   console.log('Processed events:', JSON.stringify(events, null, 2)); // Logging processed events

   return events;
};

module.exports = getSheetData;
