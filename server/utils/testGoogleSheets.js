const getSheetData = require('./googleSheets');

const testFetch = async () => {
   const spreadsheetId = '1r9Hk2an4h8FggwPcYjHNgY5QWYes-FVzeCWtAXveOB8'; // Replace with your actual spreadsheet ID
   const range = 'My Programme!A5:K'; // Replace with your actual range

   try {
      const data = await getSheetData(spreadsheetId, range);
      console.log('Processed data:', JSON.stringify(data, null, 2));
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

testFetch();
