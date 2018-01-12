<template>
  <article class="slice__interactiveExperience">
    <div class="slice__interactiveExperience__separator">
      <svg class="seperator" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#f9f9f9" width="100%" height="120" viewBox="0 0 4 0.266661" preserveAspectRatio="none" style="height: 120px;"><polygon class="fil0" points="4,0 4,0.266661 -0,0.266661 "></polygon></svg>
    </div>

    <section class="section slice__interactiveExperience__section">
      <div class="container">
        <header class="columns">
          <div class="column">
            <div class="rich-text title" v-html="$prismic.asHtml(ie.exp_title)"
              v-scroll-reveal="{distance: '100px'}"></div>
          </div>
          <div class="column is-narrow contact">
            <a href="">Contact us to experience<br> the tour on site.</a>
            <span class="down-icon fa fa-angle-double-down has-text-white"></span>
          </div>
        </header>
        
        <iframe id="pano-iframe" :src="ie.exp_iframe_url" 
          style="display: block;" allowfullscreen webkitallowfullscreen mozallowfullscreen
          v-scroll-reveal="{distance: '100px'}"></iframe>

        <div class="columns">
          <div class="column is-6">
            <div class="rich-text" 
              v-if="ie.exp_description.text"
              v-html="$prismic.asHtml(ie.exp_description)"
              v-scroll-reveal="{distance: '100px'}"></div>

            <a :href="$prismic.asLink(ie.exp_button_url)" class="button is-outlined is-primary is-small"
              v-scroll-reveal="{distance: '100px'}">{{ie.exp_button_label}}</a>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  props: ['slice'],
  head () {
    return {
      script: [
        {'src': '/pano/js/screenfull.min.js'}
      ]
    }
  },
  data () {
    return {
      ie: this.slice.primary
    }
  },
  mounted () {
    // let fullScreenScript = document.createElement('script')
    // fullScreenScript.src = '/pano/js/screenfull.min.js'
    // Write the correct ID of the iframe element,
    // as used in your html.
    /* eslint-disable */
    let el = document.getElementById("pano-iframe")

    var didUserForceExit
    var wasFs

    // if (screenfull.enabled) {
    //   setInterval(checkFullScreen, 500);
    // }

    window.goFullScreen = function (onoff) {
      if (onoff) {
        didUserForceExit = true
        if (screenfull.enabled) {
          screenfull.request(el)
        }
      } else {
        didUserForceExit = false
        if (screenfull.enabled) {
          screenfull.exit()
        }
      }
    }

    function getIframeWindow (iframe_object) {
      let doc

      if (iframe_object.contentWindow) {
        return iframe_object.contentWindow
      }

      if (iframe_object.window) {
        return iframe_object.window
      } 

      if (!doc && iframe_object.contentDocument) {
        doc = iframe_object.contentDocument
      } 

      if (!doc && iframe_object.document) {
        doc = iframe_object.document
      }

      if (doc && doc.defaultView) {
        return doc.defaultView
      }

      if (doc && doc.parentWindow) {
        return doc.parentWindow
      }

      return undefined
      }

    // If user exits the fullscreen in any other way
    // than pressing the FS button again, this will call
    // the script inside of iframe to update the FS button icon.

    function checkFullScreen () {
      if (!screenfull.isFullscreen && didUserForceExit) {
        didUserForceExit = false;
        getIframeWindow(el).UpdateFSButton();
      }
    }
   /* eslint-enable */
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins';
.slice {
  &__interactiveExperience {
    background: $grey-light;
    padding: 4rem 0 6rem;
    margin-top: 3rem;
    position: relative;
    &__separator {
      position: absolute;
      top: 0;
      width: 100%;
      height: 600px;
      background-color: rgb(179, 217, 228);
      svg {
        position: absolute;
        bottom: -1px;
      }
    }
    &__section {
      padding-top: 0;
      padding-bottom: 0;
      header {
        margin-bottom: 4rem;
        @include mobile() {
          margin-bottom: 2rem;
        }
        .contact {
          padding-top: 1.25rem; 
          text-align: right;
          @include mobile() {
            text-align: left;
            display: flex;
          }
          a {
            color: $black;
            display: block;
            font-weight: 400;
            @include mobile() {
              order: 2;
            }
          }
          span.down-icon {
            font-size: 1.5rem;
            margin-top: 1rem;
            @include mobile() {
              order: 1;
              margin: 0 1rem 0 0;
              font-size: 3rem;
            }
          }
        }
      }
      #pano-iframe {
        margin-bottom: 2rem;
        height: 600px;
        width: 100%;
        @include mobile() {
          height: 300px;
        }
      }
      .button {
        margin-top: 2rem;
        @include mobile() {
          display: block;
        }
      }
    }
  }
}
</style>

