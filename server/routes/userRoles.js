const express = require('express');
const router = express.Router();
const getSheetData = require('../utils/googleSheets');

console.log('getSheetData in userRoles.js:', getSheetData); // check if the function is correctly imported from googleSheets.js

// Route to fetch user roles
router.get('/', async (req, res) => {
   const spreadsheetId = '1r9Hk2an4h8FggwPcYjHNgY5QWYes-FVzeCWtAXveOB8';
   const range = 'Teams!B1:E';
   try {
      const data = await getSheetData(spreadsheetId, range);
      // console.log('Raw data:', data);  // Add this line
      const userRoles = data.map(row => ({
         username: row.Name || '',
         role1: row.Team || '',
         role2: '',
         role3: ''
      }));
      // console.log('Processed user roles:', userRoles);  // Add this line
      res.json(userRoles);
   } catch (error) {
      console.error('Error fetching user roles:', error);
      res.status(500).send('Error fetching user roles');
   }
});

module.exports = router;
