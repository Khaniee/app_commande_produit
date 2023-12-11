let cacheData = "appV1";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "/index.html",
        "/favicon.ico",
        "/manifest.json",
        "/db.json",
        "/",
        "/users",
        // "/products"
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  if (event.request.destination === "image") {
    // Open the cache
    event.respondWith(
      caches.open(cacheData).then((cache) => {
        // Respond with the image from the cache or from the network
        return cache.match(event.request).then((cachedResponse) => {
          return (
            cachedResponse ||
            fetch(event.request.url).then((fetchedResponse) => {
              // Add the network response to the cache for future visits.
              // Note: we need to make a copy of the response to save it in
              // the cache and use the original as the request response.
              cache.put(event.request, fetchedResponse.clone());

              // Return the network response
              return fetchedResponse;
            })
          );
        });
      })
    );
  } else {
    if (!navigator.onLine) {
      event.respondWith(
        caches.match(event.request).then((resp) => {
          if (resp) {
            return resp;
          }
          let requestUrl = event.request.clone();
          fetch(requestUrl);
        })
      );
    }
  }
});
