importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "millenia",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.09af424369145b32a9ec.js",
    "revision": "d5f1a13e156f4e7e627cdd43a284f374"
  },
  {
    "url": "/_nuxt/common.61149a7d1afb8aa7ba6b.js",
    "revision": "2aebf3b38a840184694a40d08090cbb2"
  },
  {
    "url": "/_nuxt/layouts/default.abef0d24b4ef3d4fc9c0.js",
    "revision": "8c69b64f53b2fc5bcf5f7da7aa64cee4"
  },
  {
    "url": "/_nuxt/manifest.36dc079b464e84eec48b.js",
    "revision": "1b96d1c56b1cb23186618164f9ae2509"
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
    "url": "/_nuxt/pages/index.27bbdbb42e1ca0710d16.js",
    "revision": "fc174524a7ef73242bad58b8d5c51755"
  },
  {
    "url": "/_nuxt/pages/preview.76a759f2f2d28771fd0e.js",
    "revision": "3378259c0ae9fb891ada4e414ed78974"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

