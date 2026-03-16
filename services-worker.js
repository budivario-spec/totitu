const CACHE_NAME = 'totitu-v1';

// Saat install, simpan semua file penting
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './js/app.js',
                './assets/images/logo_totitu.png'
                // Tambahkan file CSS atau gambar lain di sini
            ]);
        })
    );
});

// Saat ada request, cek apakah ada di cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
