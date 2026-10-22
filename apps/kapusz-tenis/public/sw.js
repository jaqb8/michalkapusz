// Poprzednia wersja strony instalowała service workera (vite-plugin-pwa).
// Ten plik go zastępuje: czyści cache, wyrejestrowuje się i przeładowuje otwarte karty,
// żeby odwiedzający od razu dostali nową stronę zamiast starej z pamięci podręcznej.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => client.navigate(client.url));
    })(),
  );
});
