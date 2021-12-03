const CACHE_NAME = 'BudgetTracker-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/js/index.js',
    '/js/idb.js',
    '/css/styles.css',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png',
];

self.addEventListener('install', function(evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installng cache : ' + CACH_NAME)
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', function(evt) {
    evt.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log('Remove old cache data', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});
