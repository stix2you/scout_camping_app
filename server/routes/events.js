const express = require('express');
const router = express.Router();
const getSheetData = require('../utils/googleSheets');

console.log('getSheetData in events.js:', getSheetData); // check if the function is correctly imported from googleSheets.js

// Helper function to ensure all keys are present
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

// Route to fetch event information
router.get('/', async (req, res) => {
   const spreadsheetId = '1r9Hk2an4h8FggwPcYjHNgY5QWYes-FVzeCWtAXveOB8';
   const range = 'My Programme!A5:K';
   try {
      const data = await getSheetData(spreadsheetId, range);
      console.log('Raw data:', data);  // Logging raw data

      let currentDay = '';
      const events = data.reduce((acc, row) => {
         if (row['Activity Type'] === 'Day') {
            currentDay = row.Description;  // Assuming description contains the day
         } else if (row['Activity Type'] && row['Activity Type'] !== 'Activity Type') {
            const activity = ensureKeys({ ...row, day: currentDay });
            console.log('Activity being added:', activity);  // Log each activity being added
            acc.push(activity);
         }
         return acc;
      }, []);

      console.log('Processed events:', events);  // Logging processed events

      res.json({ "2024_weekend_events": [{ event_name: "Fall Camping Weekend", activities: events }] });
   } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).send('Error fetching events');
   }
});

module.exports = router;
