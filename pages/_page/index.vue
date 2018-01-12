<template>
  <section class="page">
    <header class="section page__header" appear>
      <transition name="fade-in">
        <div class="page__header__image rellax" v-if="entry.hero_image.url" :style="`background-image: url(${entry.hero_image.large.url}) `"
          data-rellax-speed="-4" data-rellax-percentage="0.5"></div>
      </transition>
      <div class="container rellax" data-rellax-speed="-2" data-rellax-percentage="0.5">
        <h2>{{$prismic.asText(entry.title)}}
        </h2>
        <div class="rich-text has-text-white" v-html="$prismic.asHtml(entry.description)"></div>
      </div>
      <div class="page__header__separator">
        <svg class="page__header__separator__polygon" xmlns="http://www.w3.org/2000/svg" version="1.1" :fill="polygonFill" width="100%" height="120" viewBox="0 0 4 0.266661" preserveAspectRatio="none" style="height: 120px;"><polygon class="fil0" points="4,0 4,0.266661 -0,0.266661 "></polygon></svg>
      </div>
    </header>

    <subNav :items="entry.sub_nav" v-if="subnav" />

    <!-- Repeatable Slices -->
    <component v-for="(slice, index) in entry.slices" 
      :id="`${toCamelCase(slice.slice_type)}__${index + 1}`"
      :key="index" 
      :slice="slice" :position="index + 1" :total="entry.slices.length" :is="toCamelCase(slice.slice_type)"></component>
  </section>
</template>

<script>
let Rellax = require('rellax')
import subNav from '~/components/subNav'

export default {
  name: 'Page',
  components: {
    subNav
  },
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
    subnav () {
      if (this.entry.sub_nav[0].label === null) {
        return false
      } else {
        return true
      }
    },
    polygonFill () {
      if (!this.subnav) {
        return '#fff'
      } else {
        return 'rgb(240,240,240)'
      }
    },
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

      let rellax = new Rellax('.rellax')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
