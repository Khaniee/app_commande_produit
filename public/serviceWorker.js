let cacheData = "appV1";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/bundle.js',
                '/index.html',
                '/favicon.ico',
                '/manifest.json',
                '/db.json',
                '/',
                "/users",
                // "/products"
            ])
        })
    )
})

this.addEventListener("fetch", (event) => {
    const isOnline = !navigator.onLine;
    const url = new URL(event.request.url);

    const isImage = url.hostname.includes(".png") || url.hostname.includes(".jpg");

    if (!isOnline) {
        if (isImage) {
            event.respondWith(
                caches.match(event.request).then(response => {
                    if (response) {
                        return response; // Return the cached image if available
                    }

                    return fetch(event.request).then(response => {
                        if (response && response.status === 200) {
                            // Cache the fetched image for future use
                            event.waitUntil(
                                caches.open('image-cache').then(cache => {
                                    cache.put(event.request, response.clone());
                                })
                            );
                        }
                        return response;
                    });
                })
            );
        } else {
            event.respondWith(
                caches.match(event.request).then((resp) => {
                    if (resp) {
                        return resp
                    }
                    let requestUrl = event.request.clone();
                    fetch(requestUrl);
                })
            )
        }
    } else {
        event.respondWith(fetch(requestUrl));
    }
})
