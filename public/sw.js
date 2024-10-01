const CACHE_NAME = "my-site-cache-v1";
const CACHE_URLS = [
	"/",
	"/assets/css/style.css",
	"/assets/images/favicon.svg",
	"/assets/javascript/main.js",
	"/assets/javascript/components/bar-offline.js",
	"/assets/javascript/components/card-app.js",
	"/assets/javascript/components/card-app-skeleton.js",
	"/assets/javascript/components/menu-popup.js",
	"/assets/javascript/config.js",
	"/assets/javascript/controllers/appManager.js",
	"/assets/javascript/controllers/viewManager.js",
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(CACHE_URLS);
		}),
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			// Se o cache não existe retorna pela rede
			// se o cache existe ele retorna o cache atual e atuliza para a proxima vez
			const fetchPromise = fetch(event.request).then(async (networkResponse) => {
				const cache = await caches.open(CACHE_NAME);
				cache.put(event.request, networkResponse.clone());
				return networkResponse;
			});

			return response || fetchPromise;
		}),
	);
});

// Atualização do cache
self.addEventListener("activate", (event) => {
	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				}),
			);
		}),
	);
});
