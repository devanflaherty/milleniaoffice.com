<template>
  <article class="section slice__richText">
    <div class="container">
      <div  class="rich-text" v-html="$prismic.asHtml(richText.text)"
        v-scroll-reveal="{distance: '100px'}"></div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['slice'],
  data () {
    return {
      richText: this.slice.primary
    }
  }
}
</script>
