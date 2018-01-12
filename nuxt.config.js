let url = 'https://milleniaoffice.co'
let title = 'Millenia Office'
let desc = 'Millenia Office is an amenity rich cluster of three world-class campuses designed to facilitate a new paradigm of how and where people want to work.'
let unfurl = `${url}/unfurl.jpg`

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Millenia Office',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'robots', content: 'all' },
      { hid: 'description', name: 'description', content: desc },
      { hid: 'og:url', property: 'og:url', content: url },
      { hid: 'og:image', property: 'og:image', content: unfurl },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:description', property: 'og:description', content: desc },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:domain', name: 'twitter:domain', value: url },
      { hid: 'twitter:title', name: 'twitter:title', value: title },
      { hid: 'twitter:description', name: 'twitter:description', value: desc },
      { hid: 'twitter:image', name: 'twitter:image', content: unfurl },
      { hid: 'twitter:url', name: 'twitter:url', value: url }
    ],
    link: [
      { hid: 'image_src', rel: 'image_src', href: unfurl }
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
  loading: { color: '#bcdae7', height: '4px' },
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
    { src: `~plugins/vue-lazyload`, ssr: false },
    { src: `~plugins/vue-youtube-embed`, ssr: false },
    { src: `~plugins/vue-sweet-scroll`, ssr: false },
    { src: `~plugins/vue-scroll-reveal`, ssr: false },
    { src: `~plugins/vue-swiper`, ssr: false },
    { src: `~plugins/vee-validate`, ssr: false },
    { src: `~mixins/utilities` },
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
          // let hash = this.$route.hash
          // this.scrollTo(hash, 100)
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
    postcss: {
      plugins: {
        'postcss-cssnext': {
          features: {
            customProperties: false
          }
        }
      }
    },
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
