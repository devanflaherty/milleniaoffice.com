<template>
  <section class="text-centered">
    <h1>preview</h1>
  </section>
</template>

<script>
import Cookies from 'js-cookie'
var Prismic = require('prismic-javascript')

const PREVIEW_EXPIRES = 1 * 60 * 1000 // 1 minutes

export default {
  computed: {
    token () {
      return this.$route.query.token
    }
  },
  mounted () {
    this.$prismic.initApi().then((ctx) => {
      ctx.api.previewSession(this.token, ctx.linkResolver, '/').then((url) => {
        if (Cookies.get(Prismic.previewCookie)) {
          Cookies.remove(Prismic.previewCookie)
        }
        Cookies.set(Prismic.previewCookie, this.token, { expires: PREVIEW_EXPIRES })
        this.$router.push(url)
      })
    })
  }
}
</script>