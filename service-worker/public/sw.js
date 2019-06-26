const SERVICE_WORKER_VERSION = 'v2';
const CACHE_STORAGE_KEY = `static-${SERVICE_WORKER_VERSION}`;

async function preloadAndCacheAssets(cache) {
    await cache.addAll([
        '/css/styles.css',
        '/build/js/app.js',
        '/build/js/app.js.map',
        '/js/script.js',
        '/',
        '/resources/list.json',
    ]).catch(() => {});
    await cache.addAll([
        'https://picsum.photos/400/?random',
    ]).catch(() => {});
}

async function cleanUpPreviousCache(installEvent) {
    const cacheKeys = await caches.keys();

    await Promise.all(
        cacheKeys.map((key) => {
            if (key !== CACHE_STORAGE_KEY) {
                return caches.delete(key);
            }
        })
    );
}

self.addEventListener('install', (event) => {
    console.log(`Service worker ${SERVICE_WORKER_VERSION} installing`);

    // Cache assets
    event.waitUntil(
        caches.open(CACHE_STORAGE_KEY).then(preloadAndCacheAssets)
    );
});

self.addEventListener('activate', (event) => {
    // Cache assets
    event.waitUntil(
        cleanUpPreviousCache().then(() => {
            console.log(`Service worker ${SERVICE_WORKER_VERSION} now ready to handle fetches!`);
        })
    );
});

function fromNetwork(request, timeout) {
    return new Promise(function (resolve, reject) {
        const timeoutId = setTimeout(reject, timeout);

        fetch(request).then(function (response) {
            clearTimeout(timeoutId);

            if (!response.ok) {
                reject();
            }

            resolve(response);
        }, reject);
    });
}

async function fromCache(request) {
    const cache = await caches.open(CACHE_STORAGE_KEY);

    const matchFromCache = await cache.match(request);

    return matchFromCache || Promise.reject('no-cache-match');
}

async function fetchResponse(request) {
    let response;
    try {
        console.log('Fetching URL', request.url);
        response = await fromNetwork(request, 400);
    } catch (networkErr) {
        console.log('Fetching URL form cache', request.url);
        response = await fromCache(request);
    }

    return response;
}

self.addEventListener('fetch', (event) => {
    const responsePromise = fetchResponse(event.request);

    event.respondWith(responsePromise);
});
