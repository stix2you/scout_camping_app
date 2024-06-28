const express = require('express');
const router = express.Router();
const getSheetData = require('../utils/googleSheets');

console.log('getSheetData in events.js:', getSheetData); // Check if the function is correctly imported from googleSheets.js

// Route to fetch event information
router.get('/', async (req, res) => {
   const spreadsheetId = '1r9Hk2an4h8FggwPcYjHNgY5QWYes-FVzeCWtAXveOB8';
   const range = 'My Programme!A5:K';
   try {
      const events = await getSheetData(spreadsheetId, range);
      console.log('Events data:', JSON.stringify(events, null, 2)); // Logging events data

      res.json({ "2024_weekend_events": [{ event_name: "Fall Camping Weekend", activities: events }] });
   } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).send('Error fetching events');
   }
});

module.exports = router;
