const express = require('express');
const cors = require('cors');  // Import the CORS package
const path = require('path');
const eventsRouter = require('./routes/events');
const userRolesRouter = require('./routes/userRoles');

const app = express();
const PORT = process.env.PORT || 3001;

// Use CORS middleware
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api/events', eventsRouter);
app.use('/api/user-roles', userRolesRouter);

// Catch-all to serve the React app
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
