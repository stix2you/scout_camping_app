import React, { useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';

const QRScanner = () => {
   const [result, setResult] = useState(null);

   const handleScan = () => {
      const codeReader = new BrowserQRCodeReader();
      codeReader.decodeOnceFromVideoDevice(undefined, 'video').then((result) => {
         const token = result.text;
         fetch('/validate-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
         })
            .then(response => response.json())
            .then(data => {
               if (data.success) {
                  setResult(`User ID: ${data.userId}`);
               } else {
                  setResult('Invalid token');
               }
            });
      }).catch(err => {
         console.error(err);
         setResult('Error scanning QR code');
      });
   };

   return (
      <div>
         <video id="video" width="300" height="200"></video>
         <button onClick={handleScan}>Scan QR Code</button>
         {result && <p>{result}</p>}
      </div>
   );
};

export default QRScanner;
