const express = require('express');
const router = express.Router();
const getSheetData = require('../utils/googleSheets');

const spreadsheetId = '1r9Hk2an4h8FggwPcYjHNgY5QWYes-FVzeCWtAXveOB8';
const range = 'My Programme!A5:K';

router.get('/', async (req, res) => {
   try {
      const data = await getSheetData(spreadsheetId, range);
      console.log('Processed event data:', JSON.stringify(data, null, 2)); // Log processed data
      res.json({ '2024_weekend_events': data });
   } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Error fetching events' });
   }
});

module.exports = router;
