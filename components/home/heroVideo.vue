<template>
  <section id="videoHero">
    <div class="videoHero__overlay is-hidden-mobile">
      <div class="container">
        <div v-if="videoReady" v-html="$prismic.asHtml(body)" v-scroll-reveal="{scale: 1, distance: '100px', origin: 'left'}"></div>
      </div>
    </div>
    
    <div class="videoHero__embed" style="padding:56.25% 0 0 0;position:relative">
      <div style="height:100%;left:0;position:absolute;top:0;width:100%">
        <youtube :class="{'showVideo': videoReady}" class="youtubeWrapper" style="width:100%;height:100%" :video-id="heroVideoId" @ready="ready" player-width="100%" player-height="100%" :player-vars="playerVars"></youtube>
        <transition name="fade-in" appear>
          <img :src="thumbnail.large.url">
        </transition>
      </div>
    </div>

    <div class="videoHero__separator">
      <div class="videoHero__separator__icon"
        v-scroll-reveal="{origin: 'top', distance: '200px'}"><img src="~assets/img/icon.png"></div>
      <svg class="videoHero__separator__polygon" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#fff" width="100%" height="120" viewBox="0 0 4 0.266661" preserveAspectRatio="none" style="height: 120px;"><polygon class="fil0" points="4,0 4,0.266661 -0,0.266661 "></polygon></svg>
    </div>
  </section>
</template>

<script>
import { getIdFromURL } from 'vue-youtube-embed'

export default {
  props: ['url', 'thumbnail', 'body'],
  data () {
    return {
      videoReady: false,
      playerVars: {
        'autoplay': 1,
        'controls': 0,
        'autohide': 1,
        'wmode': 'opaque',
        'showinfo': 0,
        'loop': 1,
        'mute': 1,
        'playlist': getIdFromURL(this.url)
      }
    }
  },
  computed: {
    heroVideoId () {
      return getIdFromURL(this.url)
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
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
#videoHero {
  position: relative;
  overflow: hidden;
  min-height: 60vh;
  @include mobile() {
    min-height: 100%;
  }
  .videoHero {
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
    &__overlay {
      z-index: 2;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      .container {
        p {
          color: $white;
          margin-bottom: 1rem;
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
      z-index: 1;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      &__icon {
        z-index: 2;
        position: absolute;
        bottom: 1rem;
        left: 0;
        right: 0;
        margin: 0 auto;
        height: 100px;
        width: 100px;
        display: flex;
        justify-content: center;
        @include mobile() {
          bottom: .33rem;
          height: 60px;
          width: 60px;
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
</style>


