<template>
<div class="page__subnav">
  <div class="sticky" :class="{'fixed':fixed}">
    <div class="container">
      <div class="columns">
        <div class="column has-text-centered is-narrow" v-for="(nav, i) in items" :key="i">
          <a :href="nav.anchor" @click.prevent="scrollNav(nav.anchor)">{{nav.label}}</a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['items'],
  data () {
    return {
      fixed: false,
      ticking: false
    }
  },
  methods: {
    scrollNav (el) {
      this.scrollTo(el, -180)
    },
    raf () {
      if (!this.ticking) {
        window.requestAnimationFrame(this.fixSubNav)
        this.ticking = true
      }
    },
    fixSubNav () {
      let scrollTop = window.scrollY
      let subnav = document.querySelector('.page__subnav')
      let navPos = subnav.offsetTop - 100

      if (scrollTop >= navPos) {
        console.log('past', navPos, scrollTop)
        this.fixed = true
      } else if (scrollTop < navPos) {
        console.log('above')
        this.fixed = false
      }
      this.ticking = false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.raf)
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
.page__subnav {
  height: 80px;
  padding: 0 1.5rem;
  position: relative;
  @include touch () {
    display: none;
  }
  .sticky {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    display: flex;
    background: rgba(240, 240, 240, 0.9);
    z-index: 20;
    -webkit-backdrop-filter: blur(12px);
    &.fixed {
      position: fixed;
      top: 100px;
    }
    .columns {
      height: 100%;
      padding: 0;
      margin: 0;
      justify-content: center;
      .column {
        display: flex;
        align-items: center;
        justify-content: center;
        a {
          padding: 1rem 2rem;
          color: $black;
        }
      }
    }
  }
}
</style>

