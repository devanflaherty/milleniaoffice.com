<template>
  <section class="page">
    <header class="section page__header">
      <div class="container">
        <h2>{{$prismic.asText(entry.title)}}</h2>
      </div>
    </header>

    <!-- Repeatable Slices -->
    <component v-for="(slice, index) in entry.slices" :key="index" 
      :slice="slice" :position="index + 1" :total="entry.slices.length" :is="toCamelCase(slice.slice_type)"></component>
  </section>
</template>

<script>
export default {
  name: 'Page',
  head () {
    return {
      title: this.seoTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.seoDesc },
        { hid: 'og:url', property: 'og:url', content: this.seoUrl },
        { hid: 'og:image', property: 'og:image', content: this.seoImage },
        { hid: 'og:title', property: 'og:title', content: this.seoTitle },
        { hid: 'og:description', property: 'og:description', content: this.seoDesc },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:domain', name: 'twitter:domain', value: this.seoUrl },
        { hid: 'twitter:title', name: 'twitter:title', value: this.seoTitle },
        { hid: 'twitter:description', name: 'twitter:description', value: this.seoDesc },
        { hid: 'twitter:image', name: 'twitter:image', content: this.seoImage },
        { hid: 'twitter:url', name: 'twitter:url', value: this.seoUrl }
      ],
      link: [
        { hid: 'image_src', rel: 'image_src', href: this.seoImage }
      ]
    }
  },
  asyncData ({ app, params, error }) {
    return app.$prismic.initApi().then((ctx) => {
      return ctx.api.getByUID('pages', params.page).then((res) => {
        return {
          document: res,
          entry: res.data
        }
      })
    }).catch(err => {
      console.error(err)
      if (err) {
        error({statusCode: 404, message: 'The page you are looking for does not exist.'})
      }
    })
  },
  computed: {
    seoTitle () {
      if (this.entry.meta_title > 0) {
        return this.entry.meta_title
      } else {
        return this.$prismic.asText(this.entry.title)
      }
    },
    seoDesc () {
      if (this.entry.meta_description) return this.entry.meta_description
      return this.$prismic.asText(this.entry.approach)
    },
    seoImage () {
      if (this.entry.meta_image) return this.entry.meta_image.url
      return this.entry.feature_image.large.url
    },
    seoUrl () {
      return 'https://milleniaoffices.com' + this.$route.fullPath
    }
  },
  mounted () {
    if (this.document) {
      this.$store.dispatch('layout/toggleNavVis', true)
      this.$store.dispatch('layout/toggleLoading', false)

      this.$prismic.initApi().then((ctx) => {
        ctx.toolbar()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  margin-top: 100px;
}
</style>
