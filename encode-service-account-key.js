const fs = require('fs');

// Read the service account key file
const serviceAccountKey = fs.readFileSync('server/config/service-account-key.json');

// Encode it to base64
const base64EncodedKey = serviceAccountKey.toString('base64');

// Write the base64 string to a new file
fs.writeFileSync('service-account-key.json.base64', base64EncodedKey);

console.log('Base64 encoded key written to service-account-key.json.base64');
