importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "millenia",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.77c6f7666fa5e78f398e.js",
    "revision": "78cd22aff647769630b18a5bb9641cdb"
  },
  {
    "url": "/_nuxt/common.61149a7d1afb8aa7ba6b.js",
    "revision": "2aebf3b38a840184694a40d08090cbb2"
  },
  {
    "url": "/_nuxt/layouts/default.8f1936cdfa84f8b16845.js",
    "revision": "9020a2d8bacd195f4656544db88b1690"
  },
  {
    "url": "/_nuxt/manifest.8720bda2471fa1f99c5f.js",
    "revision": "ad19f2b5a4f1c3a5354f4719477e6a13"
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

