<template>
  <div id="mobileNav" :class="{'is-active': mobileNav}">
    <div class="mobile-nav-wrap">
      <nuxt-link class="navbar-item mobile-item" :to="$prismic.asLink(link.primary.link)" v-for="(link, index) in menu" :key="index">
        {{$prismic.asText(link.primary.label)}}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import {TimelineMax} from 'gsap'

export default {
  props: ['menu', 'mobileNav'],
  watch: {
    mobileNav (bool) {
      let tl = new TimelineMax({delay: 0.125})
      if (bool) {
        tl.staggerFromTo('.mobile-item', 0.33, {
          y: -100,
          autoAlpha: 0
        }, {
          y: 0,
          autoAlpha: 1
        }, 0.25)
      } else {
        tl.staggerTo('.mobile-item', 0.5, {
          autoAlpha: 0
        }, 0.25)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
#mobileNav {
  z-index: 10;
  display: none;
  visibility: hidden;
  @include touch(){
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .mobile-nav-wrap {
      z-index: 10;
      position: absolute;
      top: -100%; 
      left: 0;
      margin: auto;
      width: 100%;
      height: 100%;
      padding-top: 160px;
      padding-left: 4rem;
      padding-right: 4rem;
      background: $primary;
      @include mobile() {
        padding-left: 1rem;
        padding-right: 1rem;
      }
      .navbar-item {
        position: relative;
        display: block;
        font-size: 1.5rem;
        font-weight: 500;
        color: $black;
        background: none!important;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 2px;
        transition: color 0.5s ease;
        &:after {
          font-size: 2rem;
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          display: block;
          height: 2px;
          background: transparent;
          width: 0px;
          transition: all 0.5s ease;
        }
        &:hover {
          &:after {
            width: 50%;
            background: $black;
          }
        }
      }
    }
    &::before, &::after {
      content:'';
      display: block;
      position: absolute;
      top: -100%;
      left: 0;
      width: 100%;
      height: 100%;
    }
    // Transition timing Out
    .mobile-nav-wrap {
      transition: all 0.5s ease;
    }
    &::before {
      z-index: 8;
      background: $primary;
      transition: all 0.5s 0.25s ease;
    }
    &.is-active {
      visibility: visible;
      
      .mobile-nav-wrap, &::before, &::after {
        top: 0;
      }
      // Transitions In
      &::after {
        transition: all 0.33s ease;
      }
      &::before {
        transition: all 0.33s 0.25s ease;
      }
      .mobile-nav-wrap {
        transition: all 0.33s 0.33s ease;
      }
    }
  }
}
</style>

