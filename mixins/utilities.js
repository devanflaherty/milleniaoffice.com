import Vue from 'vue'
import {mapGetters} from 'vuex'
let camelCase = require('lodash/camelCase')

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
    // setPageStyle (primary, background, contrast, el) {
    //   this.setPageContrast(contrast)
    //   this.setPrimaryColor(primary)
    // },
    setBg (color, primary) {
      var bg = document.querySelector('.bgSpan')
      let updateBg = () => {
        bg.style.backgroundColor = color
        this.$store.dispatch('setPrimaryColor', primary)
      }

      window.requestAnimationFrame(updateBg)
    },
    setPrimaryColor (primary) {
      this.$store.dispatch('setPrimaryColor', primary)
    },
    toCamelCase (str) {
      return camelCase(str)
    },
    toNewLines (str) {
      return str.split('\n').join('<br>')
    }
  },
  mounted () {
    // this.$ss()

    if (this.$route.hash) {
      setTimeout(() => {
        this.scrollTo(this.$route.hash, -100)
      }, 1000)
    }
  }
})
