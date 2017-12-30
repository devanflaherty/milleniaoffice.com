<template>
  <nav class="navbar is-transparent">
    <transition name="nav-in" appear>
      <div class="navbar-brand" v-if="navVis">
        <div class="navbar-item">
          <img src="~assets/img/millenia_logo.png" alt="Millenia Logo" class="logo">
        </div>
        <div class="nav-burg" :class="{'is-active': mobileNav}" @click="showMobileNav">
          <span></span>
          <span></span>
        </div>
      </div>
    </transition>
    <transition name="nav-in" appear>
      <div id="navMenu" class="navbar-menu" v-if="breakpoint >= 3 && navVis">
        <div class="navbar-end" v-if="mobileNav || breakpoint > 2">
          <nuxt-link class="navbar-item" :to="$prismic.asLink(link.primary.link)" v-for="(link, index) in menu" :key="index" v-if="menu">
            {{$prismic.asText(link.primary.label)}}
          </nuxt-link>
        </div>
      </div>
    </transition>

    <mobileNav :menu="menu" :mobileNav="mobileNav"/>
  </nav>
</template>

<script>
import mobileNav from '~/components/mobileNav'
import { mapGetters } from 'vuex'

export default {
  components: {
    mobileNav
  },
  computed: {
    ...mapGetters('layout', ['mobileNav', 'navVis', 'navigationMenu', 'breakpoint']),
    menu () {
      if (this.navigationMenu) {
        return this.navigationMenu.nav
      }
    }
  },
  watch: {
    mobileNav (bool) {
      if (bool) {
        this.disableScroll(true)
      } else {
        this.disableScroll(false)
      }
    }
  },
  methods: {
    showMobileNav () {
      console.log('show')
      this.$store.dispatch('layout/toggleMobileNav', !this.mobileNav)
    },
    disableScroll (bool) {
      if (bool) {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden'
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      } else {
        document.getElementsByTagName('html')[0].style.overflow = null
        document.getElementsByTagName('body')[0].style.overflow = null
      }
    }
  },
  mounted () {
    this.$store.dispatch('layout/toggleNavVis', true)
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
.navbar {
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
  height: 100px;
  background: rgba($grey-light, 0.85);
  -webkit-backdrop-filter: blur(10px);
  .navbar-brand {
    height: 100%;
    position: relative;
    z-index: 100;
    justify-content: space-between;
    align-items: center;
    .logo {
      max-height: 42px;
    }
    .navbar-burger {
      transition: all 0.5s ease;
      background: none;
      position: relative;
      z-index: 10;
      &.is-active span {
        background: black;
      }
    }
  }
  .navbar-menu {
    z-index: 90;
    padding-left: 0;
    padding-right: 0;
    .navbar-end {
      align-items: center;
    }
    .navbar-item {
      height: 100%;
      color: $black;
      font-size: 1rem;
      position: relative;
      padding-left: 0;
      padding-right: 0;
      margin: 0 1rem; 
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        display: block;
        height: 2px;
        background: transparent;
        width: 0;
        transition: all 0.5s ease;
      }
      &:hover {
        &:after {
          background: $primary;
          width: 100%;
        }
      }
    }
  }
}

.nav-burg {
  margin-right: 1rem;
  color: $white;
  padding: 4px;
  height: 8px;
  width: 2rem;
  position: relative;
  z-index: 100;
  float: right;
  flex: 0 1 auto;
  cursor: pointer;
  transition: all 0.5s ease;
  @include desktop() {
    display: none;
  }
  &:hover {
    background: none;
  }
  span {
    cursor: pointer;
    position: absolute;
    display: block;
    content: '';
    transition: background-color .5s ease, top .5s cubic-bezier(.75,0,.50, 1.5), transform .5s cubic-bezier(.75,0,.50, 1.5);

    border-radius: 6px;
    height: 2px;
    width: 1.5rem;
    background: $black;
  }
  span:nth-child(1) {
    top: 0;
  }
  span:nth-child(2) {
    top: 100%;
  }
  &.is-active span {
    top: 50%;
    transform-origin: center center;
    background: $black!important;
    transition: background-color .5s ease, top .5s cubic-bezier(.75,0,.50, 1.5), transform .5s cubic-bezier(.75,0,.50, 1.5);
  }
  &.is-active span:nth-child(1) {
    transform: rotate(-135deg);
  }
  &.is-active span:nth-child(2) {
    transform: rotate(135deg);
  }
}

.nav-in-enter-active, .nav-in-leave-active {
  transition: all 0.5s cubic-bezier(.48, 0, .12, 1);
}
.nav-in-enter, .nav-in-leave-to {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
</style>


