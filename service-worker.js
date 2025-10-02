const CACHE_NAME = "charlotte-cache-v2";

// Split caches for better control
const STATIC_ASSETS = [
    "/",
    "/html/main/Home.html",
    "/html/main/Session.html",
    "/html/main/Shop.html",
    "/html/main/cart.html",
    "/html/main/ViewBook.html",
    "/html/regs/Login.html",
    "/html/regs/Signup.html",

    // CSS
    "/css/general.css",
    "/css/home.css",
    "/css/shop.css",
    "/css/cart.css",
    "/css/view-book.css",
    "/css/signup.css",
    "/css/animation.css",
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
    "/src/images/book-person.png",
];

// External assets (Google Translate)
const EXTERNAL_ASSETS = [
    "https://translate.google.com/translate_a/element.js?cb=initTranslate"
];

// Install
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([...STATIC_ASSETS, ...EXTERNAL_ASSETS]);
        }).catch(err => console.error("Caching failed:", err))
    );
});

// Fetch
self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);

    // Never cache Firebase/WhatsApp/email API requests
    if (
        url.origin.includes("firebaseio.com") ||
        url.origin.includes("googleapis.com") ||
        url.origin.includes("whatsapp") ||
        url.origin.includes("smtp2go")
    ) {
        return; // skip caching, fetch live
    }

    // Cache-first strategy for static + translate
    if ([...STATIC_ASSETS, ...EXTERNAL_ASSETS].some(asset => url.href.includes(asset))) {
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

    // Default: network first, fallback to cache
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});

// Activate
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
});
