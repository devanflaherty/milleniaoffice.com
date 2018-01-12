importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "millenia",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.d5aba8d151988d5eae6d.js",
    "revision": "dfaf5436c404296b430ea5d5b232af8c"
  },
  {
    "url": "/_nuxt/layouts/default.3996530668a342c33540.js",
    "revision": "e4a92c4c8e984b2cfbdee29b01eceedb"
  },
  {
    "url": "/_nuxt/manifest.0bbb710ffcf6de20448b.js",
    "revision": "809bbf2554089a3ff21ffaaca1e1e748"
  },
  {
    "url": "/_nuxt/pages/_page/_child.4c110053563c7cc0e382.js",
    "revision": "cc9eb06c84d9a5faea1ab5a18831d0aa"
  },
  {
    "url": "/_nuxt/pages/_page/index.9928f55aaecffd3d1097.js",
    "revision": "13e59553f798b14b76975c7a29338122"
  },
  {
    "url": "/_nuxt/pages/contact.734b0a239a6afcbcf046.js",
    "revision": "35d5e9aba1be41c9b065dd3145345fc6"
  },
  {
    "url": "/_nuxt/pages/index.490ab63b92c01adfe366.js",
    "revision": "ab93b97b06aca9bde547a3c21cf66d06"
  },
  {
    "url": "/_nuxt/pages/preview.b123f3d34b16c1ed80c2.js",
    "revision": "75c9b648e3c1b3aae08a2865a7b7efcc"
  },
  {
    "url": "/_nuxt/vendor.922f9915334ea0799bad.js",
    "revision": "be3748836241f0998fd071b37c29e4b4"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

