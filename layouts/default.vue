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

.background-transition {
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  transform: translateZ(0);
  width: 100%;
  z-index: 0;
  span {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    transition: background-color .5s ease-in-out;
  }
}

#loader {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0; top: 0;
  h1 {
    color: black;
    font-weight: 800;
    span {
      font-size: 44px!important;
      color: black;
      display: inline-block;
    }
    span:nth-child(1) {
      animation: wave-left infinite 2s;
    }
    span:nth-child(3) {
      animation: wave-right infinite 2s;
    }
  }
}
@keyframes wave-left {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-50px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes wave-right {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(50px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
