const CACHE_NAME = 'vidyashilp-v1';
const ASSETS = [
    '/',
    '/app.html',
    '/pages/home.html',
    '/pages/about.html',
    '/pages/academics.html',
    '/pages/admissions.html',
    '/pages/infrastructure.html',
    '/pages/contact.html',
    '/pages/mandatory.html',
    '/images/logo.jpeg',
    '/images/students_images/robotics-lab.jpeg',
    '/images/students_images/classroom-prayer.jpeg',
    '/images/students_images/campus-outdoor-1.jpeg',
    '/images/students_images/classroom-teaching.jpeg',
    '/images/students_images/campus-outdoor-2.jpeg',
    '/images/students_images/pre-primary-learning.jpeg',
    '/parent-login.html',
    '/staff-login.html',
    '/parent-dashboard.html',
    '/admin-dashboard.html'
];

// Install: cache all assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Fetch: serve from cache first, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cached => cached || fetch(event.request))
    );
});
