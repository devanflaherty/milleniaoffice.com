<template>
  <article class="section slice__highlight">
    <div class="container">
      <div class="columns flex-align-middle">
        <template v-if="highlight.highlight_placement == 'Right'">
          <div class="column is-5">
            <div class="highlight-body"
              v-scroll-reveal="{duration: 2000, scale: 0, distance: '60px'}">
              <div class="highlight-content rich-text" v-html="$prismic.asHtml(highlight.highlight_body)"></div>
            </div>
          </div>
        </template>

        <div class="column is-7">
          <div class="highlight-media"
            v-scroll-reveal="{duration: 2000, scale: 0, distance: '60px', delay: 250}">
            <template v-if="highlight.highlight_embed.html">
              <videoEmbed :embed="highlight.highlight_embed" />
            </template>
            <template v-else-if="highlight.highlight_caption.length > 0">
              <captionedImage :img="highlight.highlight_thumbnail" :caption="highlight.highlight_caption" />
            </template>
            <template v-else>
              <img :src="highlight.highlight_thumbnail.url" />
            </template>
          </div>
        </div>
      
        <template v-if="highlight.highlight_placement == 'Left'">
          <div class="column is-5">
            <div class="highlight-body"
              v-scroll-reveal="{duration: 2000, scale: 0, distance: '60px'}">
              <div class="highlight-content rich-text" v-html="$prismic.asHtml(highlight.highlight_body)"></div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['slice'],
  data () {
    return {
      highlight: this.slice.primary
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/mixins';
.flex-align-middle {
  align-items: center;
}
.highlight-body {
  display: flex;
  align-items: center;
  justify-content: center;
  .highlight-content {
    @include mobile() {
      padding: 0rem;
    }
    &.rich-text {
      width: 100%;
    }
  }
}
.highlight-media {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 100%;
  .responsiveWrap {
    flex: 1 0 100%;
  }
}
</style>