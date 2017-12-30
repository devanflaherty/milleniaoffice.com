<template>
  <article class="hero is-small slice__banner" v-if="banner.banner_image.large.url">
    <div class="separator slice__banner__separator">
      <svg class="seperator" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#f9f9f9" width="100%" height="120" viewBox="0 0 4 0.266661" preserveAspectRatio="none" style="height: 120px;"><polygon class="fil0" points="4,0 4,0.266661 -0,0.266661 "></polygon></svg>
    </div>

    <div class="slice__banner__image" :style="`background-image: url(${banner.banner_image.large.url})`"
      v-scroll-reveal="{distance: 0, delay: 500}"></div>
    <div class="slice__banner__overlay" :style="`background-color: ${banner.overlay_color}`"></div>

    <div class="slice__banner__icon"><img src="~assets/img/blue_icon.png"></div>
    
    <div class="hero-body slice__banner__body">
      <div class="container">
        <div class="slice__banner__body__title rich-text"
          v-if="banner.banner_title" 
          v-html="$prismic.asHtml(banner.banner_title)"
          v-scroll-reveal="{distance: '100px'}"></div>

        <div class="slice__banner__body__body rich-text" 
          v-if="banner.banner_body"
          v-html="$prismic.asHtml(banner.banner_body)"
          v-scroll-reveal="{distance: '100px', delay: '250'}"></div>

        <div class="slice__banner__body__footer rich-text"
          v-if="banner.banner_footer"
          v-html="$prismic.asHtml(banner.banner_footer)"
          v-scroll-reveal="{distance: '100px', delay: '500'}"></div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['slice'],
  data () {
    return {
      banner: this.slice.primary
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
.slice {
  &__banner {
    position: relative;
    padding: 2rem 0 5rem;
    &__separator {
      z-index: 3;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 118px;
    }
    &__image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover!important;
      background-position: center;
    }
    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 66%;
      height: 100%;
      opacity: 0.8;
      @include mobile() {
        width: 100%;
      }
    }
    &__icon {
      position: absolute;
      top: 3rem;
      right: 3rem;
    }
    &__body {
      p {
        @include largeType();
        line-height: 1.75;
        @include mobile() {
          font-size: 1.25rem;
        }
      }
      &__title {
        h2 {
          color: white;
        }
      }
      &__body {
        padding: 4rem 0;
      }
    }
  }
}
</style>
