<template>
  <article class="section slice__highlight">
    <div class="container">
      <div class="columns flex-align-middle">
        <template v-if="highlight.highlight_placement == 'Right'">
          <div class="column is-5">
            <div class="slice__highlight__body"
              v-scroll-reveal="{duration: 2000, scale: 0, distance: '60px', delay: 250}">
              <div class="slice__highlight__content rich-text" v-html="$prismic.asHtml(highlight.highlight_body)"></div>
            </div>
          </div>
        </template>

        <div class="column is-7 slice__highlight__mediaColumn">
          <div class="slice__highlight__media"
            v-scroll-reveal="{duration: 2000, scale: 0, distance: '60px'}">
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
            <div class="slice__highlight__body"
              v-scroll-reveal="{duration: 2000, scale: 0, distance: '60px', delay: 250}">
              <div class="slice__highlight__content rich-text" v-html="$prismic.asHtml(highlight.highlight_body)"></div>
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
.column.is-5 {
  @include mobile () {
    order: 2;
  }
}
.slice__highlight {
  .columns {
    display: flex;
    @include mobile () {
      flex-wrap: wrap;
      .column {
        flex: 1 0 100%;
      }
    }
  }
  &__body {
    display: flex;
    align-items: center;
    justify-content: center;
    &__content {
      @include mobile() {
        padding: 0rem;
      }
      &.rich-text {
        width: 100%;
      }
    }
  }
  &__mediaColumn {
    @include mobile () {
      order: 1;
    }
    &__media {
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      height: 100%;
      .responsiveWrap {
        flex: 1 0 100%;
      }
    }
  }
}
</style>