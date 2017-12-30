var url = 'https://milleniaoffice.co'
var title = 'Millenia Office'
var desc = 'Millenia Office is an amenity rich cluster of three world-class campuses designed to facilitate a new paradigm of how and where people want to work.'
var unfurl = `${url}/unfurl.jpg`

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Millenia Office',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: desc },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'robots', content: 'all' },
      { property: 'og:url', content: url },
      { property: 'og:image', content: unfurl },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:domain', value: url },
      { name: 'twitter:title', value: title },
      { name: 'twitter:description', value: desc },
      { name: 'twitter:image', content: unfurl },
      { name: 'twitter:url', value: url }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'image_src', href: unfurl },
      { rel: 'mask-icon', color: '#ffffff', href: '/safari-pinned-tab.svg' },
      { rel: 'manifest', href: '/manifest.json' }
    ],
    script: [
      {
        src: 'https://fast.wistia.com/assets/external/E-v1.js',
        async: true
      },
      {
        src: 'http://www.youtube.com/player_api'
      }
    ]
  },
  loading: { color: '#484848', height: '6px' },
  /*
  ** Global CSS
  */
  css: [
    {src: '~assets/styles/main.scss', lang: 'scss'}
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/font-awesome'
    // ['@nuxtjs/google-analytics', { ua: 'UA-108368424-1' }]
  ],
  plugins: [
    { src: `~plugins/vue-youtube-embed`, ssr: false },
    { src: `~plugins/waypoints`, ssr: false },
    { src: `~plugins/vue-scroll-reveal`, ssr: false },
    { src: `~plugins/vue-swiper`, ssr: false },
    { src: `~mixins/utilities` },
    { src: `~plugins/vee-validate` },
    { src: `~plugins/slices` },
    { src: `~plugins/prismic` }
  ],
  router: {
    middleware: ['toggleNav'],
    scrollBehavior: function (to, from, savedPosition) {
      // savedPosition is only available for popstate navigations.
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        // if no children detected
        if (to.matched.length < 2) {
          // scroll to the top of the page
          // position = { x: 0, y: 0 }
        }
        // if link has anchor,  scroll to anchor by returning the selector
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    }
  },
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'sweet-scroll', 'scrollreveal', 'vue-youtube-embed'],
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.module.rules.push({
        test: /\.js$/,
        exclude: [/(node_modules|bower_components)(?![/|\\](swiper))/] 
      })
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
  }
}
