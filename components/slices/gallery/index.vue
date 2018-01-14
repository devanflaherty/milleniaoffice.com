<template>
<article class="slice slice__gallery"
    v-scroll-reveal="{scale: 1, distance: 0}"
    @beforeReveal="reveal">
    <div class="swiper-container" ref="mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(slide, index) in images" :key="index">
          
          <div data-swiper-parallax="25%" class="slide-img" :style="`background-image: url(${slide.image.large.url})`"></div>
        </div>
      </div>
    
      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev swiper-navigation" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z"></path></svg>
      </div>
      <div class="swiper-button-next swiper-navigation" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z"></path></svg>
      </div>

    </div>
    <div class="swiper-pagination" v-if="pagination"></div>
    <!-- close swiper -->
  </article>
</template>

<script>
export default {
  props: ['galleryID'],
  data () {
    return {
      ready: false,
      gallery: {},
      images: [],
      activeSlide: 0,
      hidden: true,
      swiperOption: {
        speed: 1000,
        loop: true,
        slidesPerView: 1,
        observer: true,
        lazyLoading: true,
        parallax: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      }
    }
  },
  computed: {
    pagination () {
      return {
        true: this.gallery.dot_pagination === 'Yes',
        false: this.gallery.dot_pagination === 'No'
      }
    },
    arrows () {
      return {
        true: this.gallery.arrow_navigation === 'Yes',
        false: this.gallery.arrow_navigation === 'No'
      }
    }
  },
  watch: {
    images () {
      this.initSwiper()
    }
  },
  methods: {
    reveal () {
      this.hidden = false
    },
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
    readyPlayer: async function () {
      if (this.$refs.mySwiper) {
        return true
      }
    },
    initSwiper () {
      this.readyPlayer().then(() => {
        let swiper = this.$refs.mySwiper
        this.ready = true
        this.$swiper(swiper, this.swiperOption)
      })
    }
  },
  created () {
    this.$prismic.initApi().then((ctx) => {
      ctx.api.getByID(this.galleryID).then((res) => {
        this.gallery = res.data
        this.images = res.data.images
      })
    }).catch(err => {
      console.error(err)
    })
  },
  beforeDestroy () {
    // if (this.$refs.mySwiper && this.$refs.mySwiper.swiper) {
    //   this.$refs.mySwiper.swiper.destroy()
    // }
  }
}
</script>

<style lang="scss">
@import '~swiper/dist/css/swiper.css';
@import '~assets/styles/mixins';

.slice__gallery {
  padding-left: 0;
  padding-right: 0; 
  position: relative;
  width: 100%;
}
.swiper-slide {
  height: 100%;
}
.swiper-container {
  height: 0;
  padding-top: 56.25%;
  display: flex;
  .swiper-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
  &:hover {
    .swiper-navigation {
      opacity: 1;
      visibility: visible;
      transform: translate3d(0,0,0)
    }
  }
}

.swiper-navigation {
  background: none;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s;
  svg {
    fill: $black;
    transition: all 0.5s ease;
  }
  &:hover {
    svg {
      transform: scale(1.1);
    }
  }
  &.swiper-button-prev {
    transform: translate3d(-20px, 0, 0);
  }
  &.swiper-button-next {
    transform: translate3d(20px, 0, 0);
  }
}

.swiper-pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1rem 0;
    &-bullet {
      background: $primary;
      opacity: 1;
      margin: 0.25rem;
      &-active {
        background: darken($primary, 20%);
      }
    }
  }

</style>
