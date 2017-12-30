importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "millenia",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.4e48cd06c8d565adad33.js",
    "revision": "033faf3733219e69d544ccb57b40472a"
  },
  {
    "url": "/_nuxt/common.61149a7d1afb8aa7ba6b.js",
    "revision": "2aebf3b38a840184694a40d08090cbb2"
  },
  {
    "url": "/_nuxt/layouts/default.8291f000db512c4a546a.js",
    "revision": "c8267f6a1b6b83700f381daf01d80e4e"
  },
  {
    "url": "/_nuxt/manifest.85bcc437248216e71e9c.js",
    "revision": "4e3c3a9bce0d1ed1d3815825a1ea3027"
  },
  {
    "url": "/_nuxt/pages/_page_slug.598ba5f7acb6c06e04d4.js",
    "revision": "5e91ff9a290ba53500cddde4e35fc05f"
  },
  {
    "url": "/_nuxt/pages/contact.76c02affd0c2098f7090.js",
    "revision": "41b173b5142c0ee9dc98f1a35e0f127a"
  },
  {
    "url": "/_nuxt/pages/index.f29230d7b1609345396d.js",
    "revision": "69759367e34f2d16f50cb334809a81a6"
  },
  {
    "url": "/_nuxt/pages/preview.76a759f2f2d28771fd0e.js",
    "revision": "3378259c0ae9fb891ada4e414ed78974"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

