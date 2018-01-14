<template>
  <article class="slice__campusSelector">
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column has-text-centered">
            <div class="slice__campusSelector__headline title"
              v-html="$prismic.asHtml(campusHeadline)"></div>
            <div class="slice__campusSelector__text"
              v-html="$prismic.asHtml(campusText)"></div>
          </div>
        </div>
      </div>
    </div>

    <campusGallery :slides="selector" @campusUpdate="updateCampus"/>

    <div class="section slice__campusSelector__activeCampus">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h2 id="campusTitle" class="title has-text-white">
              <strong>00{{activeIndex + 1}}</strong> {{$prismic.asText(activeCampus.campus_title)}}
            </h2>
            <div class="slice__campusSelector__activeCampus__description rich-text  has-text-white" v-html="activeCampus.campus_description"></div>

            <div class="slice__campusSelector__activeCampus__details columns">
              <div class="column is-narrow">
                <h6 class="sub-title">Campus Overview</h6>
                <div class="rich-text has-text-white" v-html="$prismic.asHtml(activeCampus.overview)"></div>
              </div>
              <div class="column is-narrow">
                <h6 class="sub-title">Quick Look</h6>
                <div class="rich-text has-text-white" v-html="$prismic.asHtml(activeCampus.quick_look)"></div>
              </div>
            </div>
              
              
            <a :href="$prismic.asLink(activeCampus.button_url)" class="button is-primary is-small">{{activeCampus.button_label}}</a>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import campusGallery from './campusGallery'
// import {TimelineMax} from 'gsap'

export default {
  props: ['selector', 'campusHeadline', 'campusText'],
  components: {
    campusGallery
  },
  data () {
    return {
      activeIndex: 0,
      activeCampus: this.selector[0]
    }
  },
  watch: {
    activeIndex (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.animateOut()
      }
    }
  },
  methods: {
    updateCampus (i) {
      this.activeIndex = i
      this.activeCampus = this.selector[i]
    },
    animateOut () {
      // let campusTl = new TimelineMax()
      // let img = document.querySelector('#campusImage')
      // let title = document.querySelector('#campusTitle')
      // let desc = document.querySelector('#campusDesc')

      // campusTl
      //   .to(img, 0.25, {
      //     y: 200,
      //     autoAlpha: 0
      //   })
      //   .to(title, 0.25, {
      //     y: -200,
      //     autoAlpha: 0
      //   }, 0)
      //   .to(desc, 0.5, {
      //     autoAlpha: 0
      //   }, 0)
      //   .addCallback(() => {
      //     this.activeCampus = this.selector[this.activeIndex]
      //     this.animateIn()
      //   })
    },
    animateIn () {
      // let campusTl = new TimelineMax()
      // let img = document.querySelector('#campusImage')
      // let title = document.querySelector('#campusTitle')
      // let desc = document.querySelector('#campusDesc')

      // campusTl
      //   .to(img, 0.5, {
      //     y: 0,
      //     autoAlpha: 1
      //   })
      //   .fromTo(title, 0.5, {
      //     y: 200
      //   }, {
      //     y: 0,
      //     autoAlpha: 1
      //   }, 0.125)
      //   .to(desc, 0.5, {
      //     autoAlpha: 1
      //   }, 0.33)
    }
  },
  mounted () {
    this.$reveal('.slice__campusSelector__nav__campus__link', { duration: 2000 }, 100)
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
.slice {
  &__campusSelector {
    &__activeCampus {
      padding-top: 4rem;
      background: $black;
      h2 {
        strong {
          font-weight: 600;
          color: $primary;
        }
      }
      &__description {
        font-size: 1.5rem;
        line-height: 1.3;
        width: 50%;
        @include mobile () {
          width: 100%;
        }
      }
      &__details {
        margin-top: 2rem;
        h6 {
          color: $primary;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.125rem;
        }
      }
      a {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
      }
    }
  }
}
</style>

