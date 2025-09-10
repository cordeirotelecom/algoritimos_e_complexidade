// Service Worker para cache inteligente e melhor performance
const CACHE_NAME = 'algoritmos-complexidade-v3.0';
const urlsToCache = [
  '/',
  '/enhanced.html',
  '/main.html',
  '/plataforma_completa.html',
  '/exercicios_interativos.html',
  '/portal_aprendizado.html',
  '/premium_links.html',
  '/assets/style.css',
  '/assets/complexity-analyzer.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap'
];

// Install event - cache dos recursos principais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('💾 Cache service worker ativo');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - estratégia cache-first para recursos estáticos
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - retorna resposta do cache
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Verifica se a resposta é válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clona a resposta
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Activate event - limpa caches antigas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🧹 Limpando cache antiga:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Mensagem de background sync
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Notificação de atualização disponível
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
