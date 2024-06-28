/* eslint-disable no-restricted-globals */

// Event listener for the 'install' event
self.addEventListener('install', (event) => {
   console.log('Service worker installing...');
   self.skipWaiting();
});

// Event listener for the 'activate' event
self.addEventListener('activate', (event) => {
   console.log('Service worker activating...');
   event.waitUntil(self.clients.claim());
});

// Event listener for the 'fetch' event
self.addEventListener('fetch', (event) => {
   console.log('Fetching:', event.request.url);

   event.respondWith(
      caches.match(event.request)
         .then((response) => {
            // Return the cached response if found
            if (response) {
               return response;
            }

            // If not found in cache, fetch from the network
            return fetch(event.request).then(
               (networkResponse) => {
                  if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                     return networkResponse;
                  }

                  // Clone the response before caching it
                  const responseToCache = networkResponse.clone();

                  caches.open('my-cache')
                     .then((cache) => {
                        cache.put(event.request, responseToCache);
                     });

                  return networkResponse;
               }
            ).catch((error) => {
               console.error('Fetching failed:', error);
               throw error;
            });
         }).catch((error) => {
            console.error('Caching failed:', error);
            throw error;
         })
   );
});

// Handle push notifications
self.addEventListener('push', (event) => {
   const data = event.data.json();
   const title = data.title || 'Notification';
   const options = {
      body: data.body,
      icon: data.icon || '/icon-192x192.png',
      badge: data.badge || '/badge-72x72.png',
   };
   event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
   event.notification.close();
   event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then((clientList) => {
         for (const client of clientList) {
            if (client.url === '/' && 'focus' in client) {
               return client.focus();
            }
         }
         if (self.clients.openWindow) {
            return self.clients.openWindow('/');
         }
      })
   );
});

// Add an event listener for custom test push events
self.addEventListener('message', (event) => {
   console.log('Received message:', event.data);
   if (event.data && event.data.type === 'test-push') {
      const { title, body } = event.data;
      const options = {
         body: body || 'Test body',
         icon: '/logo192.png',
         badge: '/logo512.png',
      };
      console.log('Showing notification:', title, options);
      if (Notification.permission === 'granted') {
         self.registration.showNotification(title || 'Test Title', options)
            .then(() => {
               console.log('Notification displayed successfully.');
            })
            .catch((error) => {
               console.error('Error displaying notification:', error);
            });
      } else {
         console.error('No notification permission granted for this origin.');
      }
   }
});

