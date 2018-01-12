importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "millenia",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.552b00614645fd6a7a8c.js",
    "revision": "504775d73058f5a7fc6d51b0dfa74722"
  },
  {
    "url": "/_nuxt/layouts/default.57a9aaa26957317a7b23.js",
    "revision": "2370866127075e57d806887bb2a4aacb"
  },
  {
    "url": "/_nuxt/manifest.80956d5b01e76c4684c8.js",
    "revision": "fd420895bd851cff480c037c3b795b2c"
  },
  {
    "url": "/_nuxt/pages/_page/_child.46745fa0917f2ee812f5.js",
    "revision": "37090b920392344f201a3428e51960fb"
  },
  {
    "url": "/_nuxt/pages/_page/index.aa50c8b3baa568c2b660.js",
    "revision": "1e74fc4d3f6a057abb14700f5699366d"
  },
  {
    "url": "/_nuxt/pages/contact.b0c169d5c6d808be989c.js",
    "revision": "62ea64314bb2d067554e3e0a2dfbebaa"
  },
  {
    "url": "/_nuxt/pages/index.6d98ba4d925667192e69.js",
    "revision": "c7d9004d6ae199f5c869f11ea4f212f2"
  },
  {
    "url": "/_nuxt/pages/preview.b123f3d34b16c1ed80c2.js",
    "revision": "75c9b648e3c1b3aae08a2865a7b7efcc"
  },
  {
    "url": "/_nuxt/vendor.f3ea4bb1e0b0c0ce10d6.js",
    "revision": "be3748836241f0998fd071b37c29e4b4"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

