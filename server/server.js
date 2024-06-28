const express = require('express');
const cors = require('cors');
const path = require('path');
const { google } = require('googleapis');
const eventsRouter = require('./routes/events');
const userRolesRouter = require('./routes/userRoles');
const { oauth2Client, getAuthUrl } = require('./utils/oauth');

const app = express();
const PORT = process.env.PORT || 3001;

// Use CORS middleware
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// OAuth routes
app.get('/login', (req, res) => {
   const authUrl = getAuthUrl();
   res.redirect(authUrl);
});

app.get('/auth/google', (req, res) => {
   const authUrl = getAuthUrl();
   res.redirect(authUrl);
});

// OAuth callback route
app.get('/oauth2callback', async (req, res) => {
   const { code } = req.query;
   try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Get user information
      const oauth2 = google.oauth2({
         auth: oauth2Client,
         version: 'v2',
      });

      oauth2.userinfo.get((err, response) => {
         if (err) {
            console.error('Error fetching user info:', err);
            res.status(500).send('Authentication error');
            return;
         }

         // User info
         const userInfo = response.data;
         console.log('User info:', userInfo);

         // Redirect to the "Now" page with the user's information as query parameters
         res.redirect(`/now?name=${encodeURIComponent(userInfo.name)}&email=${encodeURIComponent(userInfo.email)}`);
      });
   } catch (error) {
      console.error('Error during OAuth callback:', error);
      res.status(500).send('Authentication failed');
   }
});

// API routes
app.use('/api/events', eventsRouter);
app.use('/api/user-roles', userRolesRouter);

// Catch-all to serve the React app's index.html for any other route
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
