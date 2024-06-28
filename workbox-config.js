module.exports = {
   globDirectory: 'build/',
   globPatterns: [
      '**/*.{js,css,html,png}',
   ],
   swDest: 'build/service-worker.js',
   clientsClaim: true,
   skipWaiting: true,
   runtimeCaching: [{
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
      handler: 'StaleWhileRevalidate',
      options: {
         cacheName: 'images',
         expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
         },
      },
   }],
};
