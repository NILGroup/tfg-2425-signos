
const CACHE = 'v1';

// Resources that will always be cached
const CACHE_URLS = [
    '/'
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE)
        .then(cache => cache.addAll(CACHE_URLS))
        //To change SW to 'activated' state immediately
        .then(self.skipWaiting())
        
    );
   
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
        .then(keys => keys.filter(key => key !== CACHE))
        .then(keys => Promise.all(keys.map(key => caches.delete(key))))
        //To immediately take control of all currently open clients
        .then(self.clients.claim())
    );
});
