// service-worker.js
const CACHE_NAME = "charlotte-cache-v191";

// Split caches for better control
const STATIC_ASSETS = [
    "/",
    "/html/main/Home.html",
    "/html/main/Session.html",
    "/html/main/Shop.html",
    "/html/main/cart.html",
    "/html/main/ViewBook.html",
    "/html/regs/Signup.html",

    // CSS
    "/css/general.css",
    "/css/home.css",
    "/css/shop.css",
    "/css/cart.css",
    "/css/view-book.css",
    "/css/signup.css",
    "/css/animation.css",
    "/css/media.css",
    "/css/pages.css",

    // JS
    "/js/general.js",
    "/js/shop.js",
    "/js/home.js",
    "/js/cart.js",
    "/js/user.js",
    "/js/signup.js",

    // Fonts
    "/src/fonts/Poppins-Medium.ttf",
    "/src/fonts/Poppins-SemiBold.ttf",
    "/src/fonts/Poppins-Black.ttf",

    // Images
    "/src/images/logo.jpg",
    "/src/images/person.png",
    "/src/images/person1.png",
    "/src/images/book-person.png",
];

// Install
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([...STATIC_ASSETS]);
        }).catch(err => console.error("Caching failed:", err))
    );
    self.skipWaiting();
});

// Fetch
self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);

    // Stale-while-revalidate for Google Translate scripts
    if (url.origin.includes("translate.google.com")) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return cache.match(event.request).then(cachedResponse => {
                    const fetchedResponsePromise = fetch(event.request).then(
                        networkResponse => {
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        }
                    ).catch(err => {
                        console.error("Google Translate fetch failed:", err);
                        return cachedResponse;
                    });
                    return cachedResponse || fetchedResponsePromise;
                });
            })
        );
        return;
    }

    // Never cache Firebase/WhatsApp/email API requests
    if (
        url.origin.includes("firebaseio.com") ||
        url.origin.includes("googleapis.com") ||
        url.origin.includes("whatsapp") ||
        url.origin.includes("smtp2go")
    ) {
        return; // skip caching, fetch live
    }

    // If HTML request -> try translated cache first (exact URL)
    if (event.request.destination === 'document' || url.pathname.endsWith(".html")) {
        event.respondWith((async () => {
            // const tCache = await caches.open(TRANSLATED_CACHE_NAME);
            // const matched = await tCache.match(event.request);
            // if (matched) {
            //     // Serve the full translated HTML from translated cache
            //     return matched;
            // }

            // Fallback: network-first then populate translated cache (so future visits can use translated copy)
            try {
                const networkResp = await fetch(event.request);
                // store the network response into the normal static cache for offline fallback
                const c = await caches.open(CACHE_NAME);
                c.put(event.request, networkResp.clone());
                return networkResp;
            } catch (err) {
                // If network fails, try normal cache
                const fallback = await caches.match(event.request);
                if (fallback) return fallback;
                // Last resort: return a basic response
                return new Response('<!doctype html><html><head><meta charset="utf-8"><title>Offline</title></head><body><h1>Offline</h1></body></html>', {
                    headers: { "Content-Type": "text/html" }
                });
            }
        })());
        return;
    }

    // Network-first for JS/CSS (get latest; update cache)
    if (url.pathname.endsWith(".js") || url.pathname.endsWith(".css")) {
        event.respondWith(
            fetch(event.request).then(fetchResp => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, fetchResp.clone());
                    return fetchResp;
                });
            }).catch(() => caches.match(event.request))
        );
        return;
    }

    // Cache-first strategy for static + external assets
    if ([...STATIC_ASSETS].some(asset => url.href.includes(asset))) {
        event.respondWith(
            caches.match(event.request).then(resp => {
                return resp || fetch(event.request).then(fetchResp => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, fetchResp.clone());
                        return fetchResp;
                    });
                });
            })
        );
        return;
    }

    // Default: network-first, fallback to cache
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});

// Activate - cleanup old caches except our current ones
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});
