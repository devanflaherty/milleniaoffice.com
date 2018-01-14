<template>
  <div id="mobileNav" :class="{'is-active': mobileNav}">
    <div class="mobile-nav-wrap">
      <div class="navbar-item" :class="{'has-dropdown is-hoverable': link.items[0].sub_nav_link_label}" v-for="(link, index) in menu" :key="index">
        <nuxt-link v-if="link.primary.link.type" class="mobile-item" :to="$prismic.asLink(link.primary.link)">
          {{$prismic.asText(link.primary.label)}}
        </nuxt-link>
        <a href="#" v-else>
          {{$prismic.asText(link.primary.label)}}
        </a>

        <div class="navbar-dropdown" v-if="link.items[0].sub_nav_link_label">
          <nuxt-link v-if="$prismic.asLink(sublink.sub_nav_link)" :to="$prismic.asLink(sublink.sub_nav_link)" class="navbar-item" v-for="(sublink, i) in link.items" :key="i">
            {{sublink.sub_nav_link_label}}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {TimelineMax} from 'gsap'

export default {
  props: ['menu', 'mobileNav'],
  data () {
    return {
      hoveredItem: null
    }
  },
  watch: {
    mobileNav (bool) {
      let tl = new TimelineMax({delay: 0.25})
      if (bool) {
        tl.staggerFromTo('.mobile-item', 0.25, {
          y: -100,
          autoAlpha: 0
        }, {
          y: 0,
          autoAlpha: 1
        }, 0.125)
      } else {
        tl.staggerTo('.mobile-item', 0.33, {
          autoAlpha: 0
        }, 0.25)
      }
    }
  },
  methods: {
    // showSub (length, i) {
    //   this.hoveredItem = i
    //   let navItem = document.querySelector('.is-hovering')
    //   console.log(navItem)
    //   if (navItem.classList.contains('has-dropdown')) {
    //     let dd = navItem.querySelector('.navbar-dropdown')
    //     TweenMax.to(dd, 0.5, {
    //       height: this.navHeight(length)
    //     })
    //   }
    // },
    // closeSub () {
    //   this.hoveredItem = null
    // },
    navHeight (length) {
      return (length * 40) + 'px'
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
      .navbar-item a {
        position: relative;
        display: inline-block;
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
            width: auto;
            background: $black;
          }
        }
      }
      .navbar-item.has-dropdown {
        padding-left: 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        &:hover {
          .navbar-dropdown {
            flex: 1;
            a {
              height: 30px;
              padding: .25rem 0 0;
              opacity: 1;
              visibility: visible;
            }
          }
        }
      }
      .navbar-dropdown {
        padding: 0;
        transition: all 0.5s ease;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        a {
          color: rgba($black, 0.8);
          font-size: 1.125rem;
          display: inline-block;
          opacity: 0;
          visibility: hidden;
          height: 0px;
          padding: 0;
          margin-left: 1rem;
          overflow: hidden;
          transition: all 0.5s ease;
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

