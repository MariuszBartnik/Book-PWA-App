const staticCacheName = 'static-cache-v5';

const staticResources = [
    '/',
    '/index.html',
    '/assets/css/styles.css',
    '/assets/js/ui.js',
    '/assets/js/index.js',
    '/assets/js/db.js',
    'assets/js/auth.js',
    'assets/js/config.js',
    '/assets/img/book.png'
]

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(staticResources);
            })
    )
});

self.addEventListener('activate', evt => {
    // console.log(evt);
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
});

self.addEventListener('fetch', evt => {
        evt.respondWith(
            caches.match(evt.request)
                .then(cachesResponse => {
                    return cachesResponse || fetch(evt.request);
                })
        )
});