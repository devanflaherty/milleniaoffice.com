import Vue from 'vue'
import {mapGetters} from 'vuex'
let camelCase = require('lodash/camelCase')
// import {TweenMax} from 'gsap'
// require('ScrollToPlugin')

Vue.mixin({
  computed: {
    ...mapGetters('layout', ['loading', 'breakpoint', 'navVis']),
    ...mapGetters(['primaryColor', 'backgroundColor'])
  },
  methods: {
    imageLoader (imgSrc, el) {
      var img = new Image()
      img.src = imgSrc

      img.onload = function () {
        el.appendChild(img)
      }
    },
    setPageStyle (primary, background, contrast, el) {
      this.setPageContrast(contrast)
      this.setPrimaryColor(primary)
    },
    setBg (color, el) {
      if (el) {
        el = document.querySelector(el)
      } else {
        el = document.querySelector('.bgSpan')
      }
      let updateBg = () => {
        el.style.backgroundColor = color
      }
      window.requestAnimationFrame(updateBg)
    },
    setPrimaryColor (primary) {
      this.$store.dispatch('setPrimaryColor', primary)
    },
    setPageContrast (style, el) {
      if (el) {
        el = document.querySelector(el)
      } else {
        el = document.querySelector('body')
      }
      if (style) {
        el.classList.remove('page-contrast-Dark', 'page-contrast-Light')
        el.classList.add(`page-contrast-${style}`)
      } else {
        el.classList.remove('page-contrast-Dark', 'page-contrast-Light')
      }
    },
    setHeroUiContrast (style) {
      var body = document.querySelector('body')
      if (style) {
        body.classList.remove('hero-contrast-Dark', 'hero-contrast-Light')
        body.classList.add(`hero-contrast-${style}`)
      } else {
        body.classList.remove('hero-contrast-Dark', 'hero-contrast-Light')
      }
    },
    toCamelCase (str) {
      return camelCase(str)
    },
    toNewLines (str) {
      return str.split('\n').join('<br>')
    },
    getPosition (el) {
      let xPos = 0
      let yPos = 0
      while (el) {
        if (el.tagName === 'body') {
          // deal with browser quirks with body/window/document and page scroll
          let xScroll = el.scrollLeft || document.documentElement.scrollLeft
          let yScroll = el.scrollTop || document.documentElement.scrollTop
          xPos += (el.offsetLeft - xScroll + el.clientLeft)
          yPos += (el.offsetTop - yScroll + el.clientTop)
        } else {
          // for all other non-BODY elements
          xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft)
          yPos += (el.offsetTop - el.scrollTop + el.clientTop)
        }
        el = el.offsetParent
      }
      return {
        x: xPos,
        y: yPos
      }
    }
  },
  destroy () {
    this.setHeroUiContrast()
  }
  // scrollTo (el, obj) {
  //   // this.$ss().to(el)
  //   TweenMax.to(window, 1, {
  //     scrollTo: el
  //   })
  // }
  // beforeDestroy () {
  //   var body = document.querySelector('body')
  //   body.style.backgroundColor = null
  // }
})
