const { google } = require('googleapis');
const path = require('path');
const keyFilePath = path.join(__dirname, '../config/service-account-key.json');

const auth = new google.auth.GoogleAuth({
   keyFile: keyFilePath,
   scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

const getSheetData = async (spreadsheetId, range) => {
   try {
      const response = await sheets.spreadsheets.values.get({
         spreadsheetId,
         range,
      });

      const rows = response.data.values;

      if (rows.length === 0) {
         console.error('No data found.');
         return [];
      }

      // Extract headers
      const headers = rows[0];
      const data = rows.slice(1);

      // Convert array of arrays into array of objects
      const formattedData = data.map(row => {
         let rowData = {};
         headers.forEach((header, index) => {
            rowData[header] = row[index] || '';
         });
         return rowData;
      });

      return formattedData;
   } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
      throw error;
   }
};

module.exports = { getSheetData };
