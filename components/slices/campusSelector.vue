<template>
  <article class="slice__campusSelector">
    <div class="hero slice__campusSelector__hero"
      v-scroll-reveal="{distance: '100px'}">
      <div id="campusImage" class="slice__campusSelector__hero__image" 
        :style="`background-image: url(${activeCampus.campus_image.large.url})`"></div>

      <div class="hero-body slice__campusSelector__hero__body"
          v-scroll-reveal="{distance: '100px', delay: 250}">
        <div class="container">
          <h2 id="campusTitle" class="title">
            00{{activeIndex + 1}} {{$prismic.asText(activeCampus.campus_title)}}
          </h2>
          <div id="campusDesc">
            <h6 class="sub-title">Campus Overview</h6>
            <div class="rich-text" v-html="$prismic.asHtml(activeCampus.campus_body)"></div>
            <a :href="$prismic.asLink(activeCampus.button_url)" class="button is-black">{{activeCampus.button_label}}</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Selector Nav -->
    <div class="slice__campusSelector__nav">
      <div class="slice__campusSelector__nav__campus" v-for="(c, index) in selector" :key="index">
        <a :href="toCamelCase($prismic.asText(c.campus_title))" 
          @click.prevent="updateCampus(index)"
          class="slice__campusSelector__nav__campus__link"
          :class="{'slice__campusSelector__nav__campus__link--active': activeIndex === index}">
          <h4 class="title"><span class="has-text-primary">00{{index + 1}}</span> {{$prismic.asText(c.campus_title)}}</h4>
          <p>{{c.campus_description}}</p>
          
          <span class="direct">
            <template v-if="activeIndex !== index">Show me more <i class="fa fa-long-arrow-right"></i></template>
            <template v-else>Viewing Campus</template>
          </span>
        </a>
      </div>
    </div>
  </article>
</template>

<script>
import {TimelineMax} from 'gsap'

export default {
  props: ['selector'],
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
    },
    animateOut () {
      let campusTl = new TimelineMax()
      let img = document.querySelector('#campusImage')
      let title = document.querySelector('#campusTitle')
      let desc = document.querySelector('#campusDesc')

      campusTl
        .to(img, 0.25, {
          y: 200,
          autoAlpha: 0
        })
        .to(title, 0.25, {
          y: -200,
          autoAlpha: 0
        }, 0)
        .to(desc, 0.5, {
          autoAlpha: 0
        }, 0)
        .addCallback(() => {
          this.activeCampus = this.selector[this.activeIndex]
          this.animateIn()
        })
    },
    animateIn () {
      let campusTl = new TimelineMax()
      let img = document.querySelector('#campusImage')
      let title = document.querySelector('#campusTitle')
      let desc = document.querySelector('#campusDesc')

      campusTl
        .to(img, 0.5, {
          y: 0,
          autoAlpha: 1
        })
        .fromTo(title, 0.5, {
          y: 200
        }, {
          y: 0,
          autoAlpha: 1
        }, 0.125)
        .to(desc, 0.5, {
          autoAlpha: 1
        }, 0.33)
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
    background: $grey-light;
    &__hero {
      position: relative;
      min-height: 700px;
      overflow: hidden;
      @include mobile() {
        min-height: 500px;
      }
      &__image {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        background-size: 66% auto!important;
        background-position: right bottom;
        background-repeat: no-repeat;
        @include mobile() {
          width: 66%;
          background-size: auto 200px!important;
          background-position: left bottom;
        }
      }
      &__body {
        h2 {
          @include mobile() {
            font-size: 3.75rem;
          }
        }
        .sub-title {
          color: $primary;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.75rem;
        }
        p {
          margin: 0;
          @include largeType();
          line-height: 1.5;
          strong {
            font-weight: $weight-medium;
          }
          @include mobile () {
            @include mediumType();
          }
        }
        .button {
          margin-top: 3rem;
        }
      }
    }
    &__nav {
      display: flex;
      position: relative;
      background: $grey-light;
      @include mobile() {
        flex-wrap: wrap;
      }
      &:hover {
        .slice__campusSelector__nav__campus__link {
          opacity: 0.6;
          box-shadow: none;
        }
        .slice__campusSelector__nav__campus__link:hover {
          opacity: 1;
          box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
          transform: translate3d(0,0,10px);
        }
      }
      &__campus {
        @include mobile() {
          flex: 1 0 100%;
          p {
            display: none
          }
        }
        &__link {
          position: relative;
          z-index: 1;
          display: block;
          height: 100%;
          padding: 2rem;
          background: darken($grey-light, 2%);
          transition: all 0.5s ease;
          perspective: 500px;
          &--active, &--active:hover {
            background: white;
            transform: translate3d(0,0,1px);
            span.direct {
              color: $black;
            }
          }
          &:hover {
            span.direct {
              color: $black;
            }
          }
          h4 {
            font-size: 3.25rem; 
            font-weight: $weight-normal!important;
            @include mobile() {
              font-size: $size-2;
            }
            @include tablet() {
              max-width: 230px;
              word-wrap: break-word;
            }
            @include desktop() {
              max-width: 100%;
              word-wrap: break-word;
            }
          }
          p {
            margin: 3rem 0;
            color: $grey;
          }
          span.direct {
            display: inline-block;
            color: $primary;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.5s ease;
          }
        }
      }
    }
  }
}
</style>

