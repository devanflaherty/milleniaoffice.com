<template>
  <section id="homeHero">
    <div class="homeHero__overlay">
      <div class="container" :class="heroContrast">
        <div v-html="$prismic.asHtml(heroHeadline)" v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>
      </div>
    </div>
    
    <div class="homeHero__embed" style="padding:56.25% 0 0 0;position:relative" v-if="heroVideoId">
      <div style="height:100%;left:0;position:absolute;top:0;width:100%">
        <youtube :class="{'showVideo': videoReady}" class="youtubeWrapper" style="width:100%;height:100%" :video-id="heroVideoId" @ready="ready" player-width="100%" player-height="100%" :player-vars="playerVars"></youtube>
      </div>
    </div>

    <transition name="hero-in" appear>
      <div v-if="thumbnail.large.url" class="homeHero__imageWrap rellax"
        :style="`background-image: url(${thumbnail.large.url})`"
        data-rellax-speed="-4">
      </div>
    </transition>

    <div class="homeHero__separator">
      <div class="homeHero__separator__icon"
        v-scroll-reveal="{origin: 'top', distance: '200px'}"><img src="~assets/img/icon.png"></div>
      <svg class="homeHero__separator__polygon" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#fff" width="100%" height="120" viewBox="0 0 4 0.266661" preserveAspectRatio="none" style="height: 120px;"><polygon class="fil0" points="4,0 4,0.266661 -0,0.266661 "></polygon></svg>
    </div>
  </section>
</template>

<script>
import { getIdFromURL } from 'vue-youtube-embed'

export default {
  props: ['url', 'thumbnail', 'heroHeadline', 'contrast'],
  data () {
    return {
      videoReady: false
    }
  },
  computed: {
    heroContrast () {
      return {
        'has-text-black': this.contrast === 'Dark',
        'has-text-white': this.contrast === 'Light'
      }
    },
    heroVideoId () {
      if (this.url) return getIdFromURL(this.url)
      return null
    },
    playerVars () {
      let vid = ''
      if (this.url) {
        vid = getIdFromURL(this.url)
      }
      return {
        'autoplay': 1,
        'controls': 0,
        'autohide': 1,
        'wmode': 'opaque',
        'showinfo': 0,
        'loop': 1,
        'mute': 1,
        'playlist': vid
      }
    }
  },
  methods: {
    ready (player) {
      setTimeout(() => {
        this.videoReady = true
      }, 1200)
      this.player = player
      this.player.playVideo()
      this.player.mute()
    }
  },
  mounted () {
    this.$rellax('.rellax')
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
#homeHero {
  position: relative;
  overflow: hidden;
  min-height: 90vh;
  background: $black; 
  @include mobile() {
    min-height: 60vh;
  }
  .homeHero {
    &__embed {
      z-index: 0;
      .youtubeWrapper {
        opacity: 0;
        transition: all 1s ease;
        &.showVideo {
          opacity: 1
        }
      }
      img {
        width: auto;
        height: 100%;
        display: block;
        position: relative;
      }
    }
    &__imageWrap {
      @include overlay();
      background-size: cover!important;
      background-position: cover;
    }
    &__overlay {
      z-index: 2;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.3);
      .container {
        position: relative;
        z-index: 5;
        h1, h2 {
          color: $white;
          font-size: 4rem;
          line-height: 1.2;
          @include mobile () {
            font-size: 3.25rem;
          }
          strong {
            color: $white;
          }
        }
        @include touch() {
          margin: 0 2rem;
        }
      }
    }
    &__separator {
      z-index: 6;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      &__icon {
        z-index: 2;
        position: absolute;
        bottom: 1rem;
        right: 3rem;
        margin: 0 auto;
        height: 55px;
        width: 55px;
        opacity: 0.66;
        @include mobile() {
          right: 1.5rem;
          bottom: 0;
          height: 40px;
          width: 40px;
        }
      }
      &__polygon {
        z-index: 1;
        position: absolute;
        bottom: -1px;
        width: 100%;
        @include mobile() {
          width: 200%;
        }
      }
    }
  }
}

.hero-in-enter-active, .hero-in-leave-active {
  transition: all 0.5s 1.5s ease;
}
.hero-in-enter, .hero-in-leave-to  {
  opacity: 0;
  transform: translate3d(0, -100px, 0)
}
</style>


