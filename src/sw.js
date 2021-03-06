import {registerRoute,setDefaultHandler} from 'workbox-routing';
import {CacheFirst, StaleWhileRevalidate, NetworkFirst} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {ExpirationPlugin} from 'workbox-expiration';
import {BroadcastUpdatePlugin} from 'workbox-broadcast-update';

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

registerRoute(
    /\.(?:js|css|png)$/,
    new StaleWhileRevalidate({
      cacheName: 'static-resources',
      plugins: [
        new BroadcastUpdatePlugin(),
      ],
    })
  );

setDefaultHandler(new NetworkFirst());