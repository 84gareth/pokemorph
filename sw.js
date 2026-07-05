/* PokéMorph service worker - makes the game fully playable offline after the first visit.
   When you update the game, bump the version below (v1 -> v2) so old assets are cleared. */
const CACHE = 'pokemorph-v4';
const CORE = ['./', './index.html', './manifest.json', './icon.png', './icon-192.png'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys()
        .then(ks => Promise.all(ks.filter(k => k.startsWith('pokemorph-') && k !== CACHE).map(k => caches.delete(k))))
        .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
    const req = e.request;
    if (req.method !== 'GET') return;
    // The game page itself: network-first so updates arrive immediately, cached copy when offline
    if (req.mode === 'navigate') {
        e.respondWith(fetch(req).then(res => {
            const cp = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', cp)); return res;
        }).catch(() => caches.match('./index.html')));
        return;
    }
    // Everything else (sprites, fonts): cache-first, filling the cache as things are seen
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
        const u = req.url;
        if (res.ok && (new URL(u).origin === location.origin || u.includes('raw.githubusercontent.com') || u.includes('fonts.googleapis.com') || u.includes('fonts.gstatic.com'))) {
            const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp));
        }
        return res;
    }).catch(() => caches.match('./icon.png'))));
});
