importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "millenia",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.e2c2b302524f0e228290.js",
    "revision": "a1ea327147083b099896264531ce17ab"
  },
  {
    "url": "/_nuxt/layouts/default.3996530668a342c33540.js",
    "revision": "e4a92c4c8e984b2cfbdee29b01eceedb"
  },
  {
    "url": "/_nuxt/manifest.e165ed7e3d1add66ef1e.js",
    "revision": "04cced52c4bdccd084c07f4e2518099d"
  },
  {
    "url": "/_nuxt/pages/_page/_child.548957fe7034542bd197.js",
    "revision": "7e8b21b009c83d375723017939bfb208"
  },
  {
    "url": "/_nuxt/pages/_page/index.161b23392cf963484d64.js",
    "revision": "c9d70606d9164d37809660796d7588f9"
  },
  {
    "url": "/_nuxt/pages/contact.6f620c20b658da92f957.js",
    "revision": "baa14d6c150f865b002513e4b3b91846"
  },
  {
    "url": "/_nuxt/pages/index.d51855de307fc731ad94.js",
    "revision": "c2c2af838f685dd041ecd7db2bce90e8"
  },
  {
    "url": "/_nuxt/pages/preview.b123f3d34b16c1ed80c2.js",
    "revision": "75c9b648e3c1b3aae08a2865a7b7efcc"
  },
  {
    "url": "/_nuxt/vendor.646a65afd8d126559d0e.js",
    "revision": "09266681315d9f6d12a1c3f62696fc38"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

