// public/service-worker.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  console.log("Workbox is loaded");
  
  // Precache assets (usa manifest generado en el build)
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

  // Ejemplo: cachear peticiones de imágenes
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
        }),
      ],
    })
  );
} else {
  console.log("Workbox no se pudo cargar");
}
