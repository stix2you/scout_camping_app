// googleSheets.js
const { google } = require('googleapis');
const sheets = google.sheets('v4');

const auth = new google.auth.GoogleAuth({
   keyFile: 'path/to/your/credentials.json',
   scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const getSheetData = async (spreadsheetId, range) => {
   const authClient = await auth.getClient();
   const request = {
      spreadsheetId,
      range,
      auth: authClient,
   };

   try {
      const response = await sheets.spreadsheets.values.get(request);
      return response.data.values;
   } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
      throw error;
   }
};

module.exports = getSheetData;
