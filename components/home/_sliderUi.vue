<template>
  <div class="slide-ui">
    <div class="container">
      <!-- <div class="swiper-button-prev swiper-arrow"><i class="fa fa-angle-left"></i></div>
      <div class="swiper-button-next swiper-arrow"><i class="fa fa-angle-right"></i></div> -->

      <div ref="pagination" class="swiper-custom-pagination" :class="`slide-ui-${slideUi}`">
        <a class="pagination-bullet"
          :class="{'active': activeSlide == index}"
          @click="slideToEmit(index)" 
          @mouseenter="pauseSliderEmit()"
          @mouseleave="playSliderEmit()"
          :href="`#slide${index}`" 
          v-for="(tab, index) in tabs" 
          :key="index">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// import heroTransitions from './_transitions'

export default {
  props: ['tabs', 'slideUi', 'activeSlide'],
  // mixins: [heroTransitions],
  methods: {
    slideToEmit (index) {
      // var i = index + 1
      this.$emit('slideToEmit', index)
    },
    pauseSliderEmit () {
      this.$emit('pauseSliderEmit')
    },
    playSliderEmit () {
      this.$emit('playSliderEmit')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
.slide-ui {
  background: $black;
  position: absolute;
  width: 100%;
  bottom: -60px;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 20;
  .container {
    height: 100%;
    @include touch() {
      margin: 0 3rem;
    }
    @include mobile() {
      margin: 0 1rem;
    }
  }
}
.swiper-custom-pagination {
  z-index: 15;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  .pagination-bullet {
    opacity: 1;
    flex: 1 0 auto;
    display: inline-block;
    position: relative;
    margin: 0 2px;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    &::after, &::before {
      content: '';
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      display: block;
      height: 1px;
    }
    &::after {
      width: 0;
      background: rgba(white, 1);
      transition: width .25s linear;
    }
    &::before {
      width: 100%;
      background: rgba(white, 0.25);
    }
    &.active {
      &::after {
        width: 100%;
        transition: width 6s linear;
      }
    }
    &:not(.active) {
      @include mobile() {
        visibility: hidden;
        opacity: 0;
      }
    }
    @include mobile() {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
}

.slide-ui-Light {
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
</style>
