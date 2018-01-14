<template>
  <article class="slice__campusSelector__gallery"
    v-scroll-reveal="{scale: 1, distance: 0}">
    <div class="swiper-container" ref="mySwiper">
      <div class="swiper-wrapper">
        
        <div class="swiper-slide" :class="`slide-ui-Light`" v-for="(slide, index) in slides" :key="index">
          <div :style="`background: url(${slide.campus_image.url})`" data-swiper-parallax="25%" class="slide-img"></div>
        </div>

      </div>
    </div>

    <SliderUi 
      ref="pagination" 
      :tabs="slides" 
      :activeSlide="activeSlide" 
      @slideToEmit="slideTo"
      @pauseSliderEmit="pauseSlider()"
      @playSliderEmit="playSlider()"
      />
    <!-- close swiper -->
  </article>
</template>

<script>
import SliderUi from './_sliderUi'
// import sliderTransitions from './_transitions'

export default {
  components: {
    SliderUi
  },
  props: ['slides'],
  data () {
    return {
      ready: false,
      activeSlide: 0,
      swiperOption: {
        speed: 1000,
        initialSlide: 0,
        loop: true,
        slidesPerView: 1,
        observer: true,
        lazyLoading: true,
        parallax: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        on: {
          slideChange: (swiper) => {
            this.activeSlide = this.$refs.mySwiper.swiper.realIndex
            this.$emit('campusUpdate', this.$refs.mySwiper.swiper.realIndex)
          }
        }
      }
    }
  },
  watch: {
    ready () {
      if (this.$refs.mySwiper) {
        this.initSwiper()
      }
    }
  },
  methods: {
    slideTo (index) {
      let i = index + 1
      this.$refs.mySwiper.swiper.slideTo(i)
    },
    pauseSlider () {
      this.$refs.mySwiper.swiper.autoplay.stop()
    },
    playSlider () {
      this.$refs.mySwiper.swiper.autoplay.start()
    },
    initSwiper () {
      let swiper = this.$refs.mySwiper
      this.$swiper(swiper, this.swiperOption)
    }
  },
  mounted () {
    setTimeout(() => {
      this.ready = true
    }, 1000)
  },
  beforeDestroy () {
    this.$refs.mySwiper.swiper.destroy()
  }
}
</script>

<style lang="scss">
@import '~swiper/dist/css/swiper.css';
@import '~assets/styles/mixins';

.slice__campusSelector__gallery {
  padding-left: 0;
  padding-right: 0; 
  min-height: 500px;
  height: 85vh;
  position: relative;
  // overflow: hidden;
  width: 100%;
}

.swiper-container, .swiper-slide {
  height: 100%;
}
.swiper-container {
  display: flex;
  .swiper-wrapper {
    .swiper-slide {
      flex: 1 0 100%;
      position: relative;
      overflow: hidden;
      .container {
        @include touch () {
          margin: 0;
        }
      }

      .slide-img {
        height: 100%;
        width: 100%;
        background-size: cover!important;
        background-position: center;
      }
    }
  }
}

// Color themes
.slide-ui-Dark {
  .caption {
    h2, h3, h4, h5 {
      color: black;
    }
    p, a, span {
      color: black;
    }
  }
  .pagination-bullet {
    span {
      color: rgba(black, 0.5);
    }
    &:hover span, &.active span {
      color: rgba(black, 1);
    }
    &::after {
      background: rgba(black, 1);
    }
    &::before {
      background: rgba(black, 0.25);
    }
  }
}

.slide-ui-Light {
  .caption {
    h2, h3, h4, h5 {
      color: white;
    }
    p, a, span {
      color: white;
    }
  }
  .pagination-bullet {
    span {
      color: rgba(white, 0.5);
    }
    &:hover span, &.active span {
      color: rgba(white, 1);
    }
    &::after {
      background: rgba(white, 1);
    }
    &::before {
      background: rgba(white, 0.25);
    }
    &.active {
      color: white;
    }
  }
}

@keyframes progress {
  0% {
    width: 0
  }
  100% {
    width: 100%;
  }
}
</style>
