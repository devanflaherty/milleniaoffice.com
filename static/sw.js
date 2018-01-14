importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "millenia",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.49df80f95981d61f1857.js",
    "revision": "cc9a03d4c31e627e8936ea721fa2d168"
  },
  {
    "url": "/_nuxt/layouts/default.61c64f58a0069ad8715c.js",
    "revision": "fad032325e09ea164b8c2cb5dbe94e86"
  },
  {
    "url": "/_nuxt/manifest.a9096ab7ca151bf9bd15.js",
    "revision": "6efbc948f0f346388938cab13aa04afc"
  },
  {
    "url": "/_nuxt/pages/_page/_child.39c24a0e9affb867c4ca.js",
    "revision": "414488f23dbdeb31cbea28f0da84ec34"
  },
  {
    "url": "/_nuxt/pages/_page/index.1e9547bc7d728257f895.js",
    "revision": "498cb7cb8c32824f7ea0bd40f01391a2"
  },
  {
    "url": "/_nuxt/pages/contact.dd0deabd9630e0f7f1b5.js",
    "revision": "a69bebee8d8d5cc8540cc94314700af0"
  },
  {
    "url": "/_nuxt/pages/index.8162d294ab9240a5f11f.js",
    "revision": "4609ebb77af5e5f9af74e83ce39dcc8a"
  },
  {
    "url": "/_nuxt/pages/preview.b123f3d34b16c1ed80c2.js",
    "revision": "75c9b648e3c1b3aae08a2865a7b7efcc"
  },
  {
    "url": "/_nuxt/vendor.62b590ef74d9d4634e91.js",
    "revision": "6ebbf31d19fac3f91c4fee762d8d14ad"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

