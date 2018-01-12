<template>
  <main class="main">
    <SiteNav />
    <nuxt />
    <SiteFooter v-if="!loading" />
  </main>
</template>

<script>

import SiteNav from '~/components/SiteNav'
import SiteFooter from '~/components/SiteFooter'

import breakpoints from '~/mixins/breakpoints'
import {beforeEnter, enter, leave} from '~/mixins/page-transitions'
import {mapGetters} from 'vuex'

export default {
  components: {
    SiteNav,
    SiteFooter
  },
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    beforeEnter,
    enter,
    leave
  },
  mixins: [breakpoints],
  computed: {
    ...mapGetters('layout', ['loading'])
  },
  beforeCreate () {
    this.$store.dispatch('layout/getMenus')
    this.$store.dispatch('layout/getSettings')
  }
}
</script>

<style lang="scss">
.wio-link {
  position: absolute;
  z-index: 50;
  left: 0;
  top: 0;
  background: rgba(white, 0.2);
  padding: .5rem 1rem;
  transition: all 0.5s ease;
  &:hover {
    background: white;
  }
}
</style>
