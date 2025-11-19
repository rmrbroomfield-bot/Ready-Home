
const CACHE_NAME = 'readyhome-phase1-full-v1';
const ASSETS = [
  './',
  './gate.html',
  './gate.js',
  './index.html',
  './plan.html',
  './plan.js',
  './incidents.html',
  './incidents.js',
  './alerts.html',
  './alerts.js',
  './app.css',
  './manifest.webmanifest',
  './config.json',
  './samples/incidents-sample.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if(url.origin === location.origin){
    event.respondWith(
      caches.match(event.request).then(resp => resp || fetch(event.request))
    );
  }
});
