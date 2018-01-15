<template>
<div class="page" v-if="!loading">
  <heroVideo :heroHeadline="home.headline" :url="home.hero_video.embed_url" :thumbnail="home.hero_image" :conrast="home.hero_contrast" />
  
  <article class="home-welcome section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="rich-text" v-html="$prismic.asHtml(home.description)" v-scroll-reveal="{scale: 1, distance: '200px', delay: '250'}"></div>
        </div>

        <div class="column">
          <videoEmbed :embed="home.video" v-scroll-reveal="{scale: 1, distance: '200px', origin: 'bottom', delay: '500', viewFactor: 0.1}"/>
        </div>
      </div>
    </div>
  </article>

  <!-- Repeatable Slices -->
  <component v-for="(slice, index) in home.slices" :key="index" 
    :slice="slice" :is="toCamelCase(slice.slice_type)" :id="`${slice.slice_type}-${index}`"></component>
  
  <!-- Campus Selector -->
  <campusSelector :selector="home.campus_selector" :campusHeadline="home.campus_headline" :campusText="home.campus_text" />
  <!-- Testimonies -->
  <testimonies :quotes="home.testimonies" />
</div>
</template>

<script>
import heroVideo from '~/components/home/heroVideo'
import {beforeEnter, enter, leave} from '~/mixins/page-transitions'

export default {
  head () {
    return {
      title: 'Home'
    }
  },
  transition: {
    name: 'home',
    mode: 'out-in',
    css: false,
    beforeEnter,
    enter,
    leave
  },
  components: {
    heroVideo
  },
  data () {
    return {
      msg: ''
    }
  },
  asyncData ({ params, app }) {
    return app.$prismic.initApi().then((ctx) => {
      return ctx.api.getSingle('home').then((res) => {
        return {
          document: res,
          home: res.data
        }
      })
    }).catch(err => {
      console.error(err)
    })
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
.home-title.section {
  padding-bottom: 0;
}
</style>

